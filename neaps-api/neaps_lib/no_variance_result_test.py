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

import unittest

import numpy as np

from functions import no_variance_result

test_cases = [
    {
        'num': np.float64(3),
        'wip': 1,
        'runsdim': np.float64(6),
        'runstot': 1,
        'fun': 0,
        '0': 18,
        '1': 2,
        '2': 2,
        'tot': 1
    },
    {
        'num': np.float64(3),
        'wip': 2,
        'runsdim': np.float64(6),
        'runstot': 1000,
        'fun': 0,
        '0': 9,
        '1': 4,
        '2': 1,
        'tot': 1000
    },
    {
        'num': np.float64(3),
        'wip': 3,
        'runsdim': np.float64(9),
        'runstot': 9999,
        'fun': 0,
        '0': 9,
        '1': 9,
        '2': 1,
        'tot': 9999
    },
    {
        'num': np.float64(8),
        'wip': 2,
        'runsdim': np.float64(64),
        'runstot': 10,
        'fun': 0,
        '0': 256,
        '1': 16,
        '2': 4,
        'tot': 10
    }
]

results_fun0 = []
results_fun1 = []
results_fun2 = []


class NoVarianceTestCase(unittest.TestCase):
    """ docstring """
    def setUp(self):
        for i in range(len(test_cases)):
            results_fun0.append(
                no_variance_result(
                    test_cases[i]['num'],
                    test_cases[i]['wip'],
                    test_cases[i]['runsdim'],
                    test_cases[i]['runstot'],
                    0
                )
            )

            results_fun1.append(
                no_variance_result(
                    test_cases[i]['num'],
                    test_cases[i]['wip'],
                    test_cases[i]['runsdim'],
                    test_cases[i]['runstot'],
                    1
                )
            )

            results_fun2.append(
                no_variance_result(
                    test_cases[i]['num'],
                    test_cases[i]['wip'],
                    test_cases[i]['runsdim'],
                    test_cases[i]['runstot'],
                    2
                )
            )

    def test_len(self):
        """ test for boostrap helper"""
        for i in range(len(test_cases)):
            self.assertEqual(len(results_fun0[i]), test_cases[i]['tot'])
            self.assertEqual(len(results_fun1[i]), test_cases[i]['tot'])
            self.assertEqual(len(results_fun2[i]), test_cases[i]['tot'])

    def test_mean(self):
        """ docstring """
        for i in range(len(test_cases)):
            for j in range(len(results_fun0[i])):
                self.assertEqual(results_fun0[i][j], test_cases[i]['0'])
                self.assertEqual(results_fun1[i][j], test_cases[i]['1'])
                self.assertEqual(results_fun2[i][j], test_cases[i]['2'])

if __name__ == '__main__':
    unittest.main()