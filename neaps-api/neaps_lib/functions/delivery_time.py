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

#def singleSimulation(preds, throughput, runsdim):
def delivery_time(preds, wip, target):
    """ delivery_time """
    clus = StackCluster()

    for i in range(wip):
        clus.add_stack()

    sim = np.random.choice(preds, target, replace=True)

    for k in range(len(sim)):
        cur = clus.get_smaller_stack()
        cur.add_item(sim[k])

    res = clus.get_bigger_stack()

    return res.get_tot()
