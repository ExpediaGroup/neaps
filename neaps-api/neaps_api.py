# -*- coding: utf-8 -*-

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

""" Quantag API """
from flask import (Flask,
                   request,
                   jsonify,
                   make_response)

#from flask.ext.cors import CORS

import numpy as np
from neaps_lib.functions import get_simulation_results

def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_pyfile(config_filename)

    @app.route('/check')
    def healthcheck():
        """ Healthcheck uri """
        res = make_response("OK", 200)
        return res

    @app.route('/api', methods=['POST'])
    def api():
        """ API uri """
        data = request.get_json(force=False, silent=False, cache=False)

        simulations = collect_data(data, int(data['fun']))

        return analyze_data(simulations, 3, [55., 75., 95.])

    return app

#neaps_cors = CORS(neaps, resources={r"/*": {"origins": "http://localhost"}})

def collect_data(data, fun):
    """ Collect Data trough standard functions """
    predstot = int(data['predstot'])
    runstot = int(data['runstot'])
    fun = int(data['fun'])

    chunksin = data['chunks']
    chunks = []
    requests = []
    debts = []

    for chunk in chunksin:
        sample = [np.float64(x) for x in chunk['sample'].split(',')]
        wip = int(chunk['wip'])
        runsdim = int(chunk['runsdim'])
        td_low_bound = float(chunk['td_low_bound'])
        td_high_bound = float(chunk['td_high_bound'])

        predsdim = int(len(sample) / 4) + 1

        request = {
            'sample': sample,
            'wip': wip,
            'predstot': predstot,
            'predsdim': predsdim,
            'runstot': runstot,
            'runsdim': runsdim,
            'td_low_bound': td_low_bound,
            'td_high_bound': td_high_bound,
            'fun': fun
        }

        out = get_simulation_results(
            sample,
            wip,
            predstot,
            predsdim,
            runstot,
            runsdim,
            td_low_bound,
            td_high_bound,
            fun
        )

        chunks.append(out[0])
        debts.append(out[1])
        requests.append(request)

    return (requests, chunks, debts)

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

# def range_gen(minimum, maximum):
#     """ Generates the correct rang for histogram """
#     return np.floor((maximum - minimum) / 10).astype(np.int64)

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

    return jsonify(
        table = chunks_table,
        fun = requests[0]['fun']
        )

if __name__ == '__main__':
    neaps_app = create_app('production.cfg')
    neaps_app.run()
