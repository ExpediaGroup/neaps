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

""" bootstrap function """
import numpy as np

def bootstrap(sample, predstot, predsdim, tot_integer=False):
    """ bootstrap helper """
    preds = []

    for i in range(predstot):
        pick = np.random.choice(sample, predsdim, replace=True)
        if tot_integer:
            preds.append(np.int64(np.floor(np.mean(pick))))
        else:
            preds.append(np.mean(pick))

    return preds
