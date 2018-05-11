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

import numpy as np

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
