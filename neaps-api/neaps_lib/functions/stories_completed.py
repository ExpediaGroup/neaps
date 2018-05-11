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

""" calculate debt function """
import numpy as np
from neaps_lib.classes import StackCluster

def stories_completed(preds, wip, target):
    """ stories completed """
    clus = StackCluster()

    for i in range(wip):
        clus.add_stack()

    init = int(target/ max(preds)) - 1
    #init = int(data[2] / max(data[0]) / data[1])

    for j in range(wip):
        sim = np.random.choice(preds, init, replace=True)
        for k in range(init):
            clus.get_stack(j).add_item(sim[k])

    while True:
        res = clus.get_bigger_stack()
        if res.get_tot() >= target:
            break

        sim = np.random.choice(preds, 1, replace=True)
        cur = clus.get_smaller_stack()
        cur.add_item(sim[0])

    return clus.get_count()
