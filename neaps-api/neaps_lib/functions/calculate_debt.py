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

def calculate_debt(runsdim, runstot, low_bound, high_bound):
    """ calculates tech debt and bugs """
    debt_indexes = np.random.uniform(low_bound, high_bound, runstot)
    debt_indexes = runsdim * debt_indexes
    debt_indexes = np.rint(debt_indexes)

    return np.int64(debt_indexes)
