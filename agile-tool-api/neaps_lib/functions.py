#
# Copyright 2018 Expedia Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

""" functions """
import time
from multiprocessing import Pool, cpu_count
import numpy as np
from flask import jsonify
from neaps_lib.classes import StackCluster

#bootstraps data
def bootstrap(sample, predstot, predsdim, tot_integer=False):
    """ bootstrap helper """
    preds = []

    for i in range(predstot):
        pick = np.random.choice(sample, predsdim, replace=True)
        if tot_integer == True:
            preds.append(np.int64(np.floor(np.mean(pick))))
        else:
            preds.append(np.mean(pick))

    return preds

def calculate_debt(runsdim, runstot, low_bound, high_bound):
    """ calculates tech debt and bugs """
    debt_indexes = np.random.uniform(low_bound, high_bound, runstot)
    debt_indexes = runsdim * debt_indexes
    debt_indexes = np.rint(debt_indexes)

    return np.int64(debt_indexes)

#def singleSimulation(preds, throughput, runsdim):
def delivery_time(data):
    """ delivery_time """
    clus = StackCluster()

    for j in range(data[1]):
        clus.add_stack()

    sim = np.random.choice(data[0], data[2], replace=True)

    for k in range(len(sim)):
        cur = clus.get_smaller_stack()
        cur.add_item(sim[k])

    res = clus.get_bigger_stack()

    return res.get_tot()

#def singleSimulation(preds, throughput, runsThreshold):
def stories_completed(data):
    """ stories completed """
    clus = StackCluster()

    for j in range(data[1]):
        clus.add_stack()

    init = int(data[2] / max(data[0])) - 1
    #init = int(data[2] / max(data[0]) / data[1])

    for j in range(data[1]):
        sim = np.random.choice(data[0], init, replace=True)
        for k in range(init):
            clus.get_stack(j).add_item(sim[k])

    while True:
        res = clus.get_bigger_stack()
        if res.get_tot() >= data[2]:
            break

        sim = np.random.choice(data[0], 1, replace=True)
        cur = clus.get_smaller_stack()
        cur.add_item(sim[0])

    return clus.get_count()

#def singleSimulation(preds, teams, runsdim):
def sprints_needed(data):
    """ sprints needed """
    clus = StackCluster()

    for j in range(data[1]):
        clus.add_stack(True)

    init = int(data[2] / max(data[0]) / data[1])

    for j in range(data[1]):
        sim = np.random.choice(data[0], init, replace=True)
        for k in range(init):
            clus.get_stack(j).add_item(sim[k])

    while True:
        res = clus.get_tot()
        if res >= data[2]:
            break

        sim = np.random.choice(data[0], data[1], replace=True)

        for i in range(data[1]):
            clus.get_stack(i).add_item(sim[i])

    return clus.get_bigger_stack().get_count()


funs = [delivery_time, stories_completed, sprints_needed]

#calculates results
def get_simulation_results(sample,
                           wip,
                           predstot,
                           predsdim,
                           runstot,
                           runsdim,
                           low_bound,
                           high_bound,
                           fun):
    """ main function """
    #checking sample variance
    if np.var(sample) == .0:
        print("No variance in the sample I won't run the montecarlo simulation./n")
        print("Tech debt growth will be ignored as well.")
        res = no_variance_result(np.mean(sample),
                                 wip,
                                 np.float64(runsdim),
                                 runstot,
                                 fun)
        return (res, [0 for x in range(runstot)])

    # generation of bug/tech debts
    debts = calculate_debt(runsdim, runstot, low_bound, high_bound)
    runsdim = runsdim + debts

    start_time = time.time()

    # sample bootstrap
    if fun == 2:
        preds = bootstrap(sample, predstot, predsdim)
    else:
        preds = bootstrap(sample, predstot, predsdim, True)
    print("--- %s seconds to boostrap %s predictions ---" % ((time.time() - start_time), predstot))

    start_time = time.time()

    # montecarlo simulation
    data = [[preds, wip] for x in range(runstot)]

    for i in range(len(data)):
        data[i].append(runsdim[i])

    cpus = cpu_count()
    print("--- %s available cpus ---" % cpus)
    out = parallelized_simulations(funs[fun], data, cpus)

    print("--- %s seconds for %s montecarlo runs ---" % ((time.time() - start_time), runstot))

    return (out, debts)

#calculates a quicker and simple value if the sample is not good for a montecarlo simulation
def no_variance_result(num, wip, runsdim, runstot, fun):
    """ fake simulation in case of historical sample variance is equal to 0"""
    switcher = {
        0: lambda num, wip, runsdim: np.ceil(runsdim / wip) * num,
        1: lambda num, wip, runsdim: np.ceil((runsdim / num) * wip),
        2: lambda num, wip, runsdim: np.ceil((runsdim / num) / wip),
    }
    # Get the function from switcher dictionary
    func = switcher.get(fun, lambda: "nothing")
    res = func(num, wip, runsdim)
    return [res for x in range(runstot)]

# uses process pool
def parallelized_simulations(fun, data, procs):
    """ multithread helper """
    pool = Pool(processes=procs)
    results = pool.map(fun, data)
    pool.close()
    pool.join()
    return results

def labels_gen(number, total):
    """ Generates labels for summary table """
    count = 0
    while count < number:
        if count == 0 and not total:
            yield 'N°'
        elif count == 0 and number == 1 and total:
            yield 'Tot'
        elif count == number - 1 and total:
            yield 'Tot'
        elif not total:
            yield str(count)
        else:
            yield str(count + 1)

        count += 1

def collect_data(predstot, runstot, chunksin, fun):
    chunks = []
    requests = []
    debts = []

    for chunk in chunksin:
        predsdim = int(len(chunk['sample']) / 4) + 1

        request = {
            'sample': chunk['sample'],
            'wip': chunk['wip'],
            'predstot': predstot,
            'predsdim': predsdim,
            'runstot': runstot,
            'runsdim': chunk['runsdim'],
            'td_low_bound': chunk['td_low_bound'],
            'td_high_bound': chunk['td_high_bound'],
            'fun': fun
        }

        out = get_simulation_results(
            chunk['sample'],
            chunk['wip'],
            predstot,
            predsdim,
            runstot,
            chunk['runsdim'],
            chunk['td_low_bound'],
            chunk['td_high_bound'],
            fun
        )

        chunks.append(out[0])
        debts.append(out[1])
        requests.append(request)

    return (requests, chunks, debts)

def analyze_data(data, decimals, percentiles):
    """ Runs simulations """
    requests = data[0]
    requests.append(None)

    chunks = data[1]
    debts = data[2]

    chunks_tot = np.sum(chunks, axis=0)

    chunks_table = []

    ran = [chunks_tot] if len(chunks) == 1 else np.append(chunks, [chunks_tot], axis=0)
    label = labels_gen(len(ran), True)

    averages = []

    for i, chunk in enumerate(ran):
        montecarlo = True

        if i != len(ran) - 1:
            debts_table = {}
            debts_percentiles = np.percentile(debts[i], [5., 50., 95.]).round(decimals=decimals).tolist()
            debts_table['min'] = debts_percentiles[0]
            debts_table['median'] = debts_percentiles[1]
            debts_table['max'] = debts_percentiles[2]

        if requests[i]!= None and np.var(requests[i]['sample']) == .0:
            montecarlo = False
            average = chunk[0].item()
        else:
            montecarlo = True
            p_values = np.percentile(chunk, percentiles).round(decimals=decimals)
            maximum = np.amax(chunk).round(decimals=decimals).item()
            average = np.percentile(chunk, 75).round(decimals=decimals).item()

        summary = {
            'name': next(label),
            'low': average if montecarlo is False else p_values[0].item(),
            'medium': average if montecarlo is False else p_values[1].item(),
            'high': average if montecarlo is False else p_values[2].item(),
            'max': average if montecarlo is False else maximum,
            'average': average,
            'montecarlo': montecarlo,
            'longest': False,
            'shortest': False,
            'request': requests[i],
            'debts': debts_table if (i != len(ran) - 1) else None
            }

        if summary['name'] != 'Total' or len(ran) == 1:
            averages.append(average)

        chunks_table.append(summary)

    if len(ran) > 1:
        longest_average = np.amax(averages[:-1])
        shortest_average = np.amin(averages[:-1])

        longest_i = averages.index(longest_average)
        shortest_i = averages.index(shortest_average)

        chunks_table[longest_i]['longest'] = True
        chunks_table[shortest_i]['shortest'] = True

    return {
        'table': chunks_table,
        'fun': requests[0]['fun']
        }
