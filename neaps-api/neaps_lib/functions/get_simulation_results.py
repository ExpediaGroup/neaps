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

import time
from multiprocessing import cpu_count

import numpy as np

from neaps_lib.functions.delivery_time import delivery_time
from neaps_lib.functions.stories_completed import stories_completed
from neaps_lib.functions.sprints_needed import sprints_needed
from neaps_lib.functions.no_variance_result import no_variance_result
from neaps_lib.functions.calculate_debt import calculate_debt
from neaps_lib.functions.bootstrap import bootstrap
from neaps_lib.functions.parallelized_simulations import parallelized_simulations

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

    print(sample)
    print(type(sample[0]))

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