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