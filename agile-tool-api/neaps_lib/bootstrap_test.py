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
from functions import bootstrap

test_cases = [
    {
        'sample': [3, 3, 3],
        'predstot': 1,
        'predsdim': 1,
        'len': 1,
        'mean': np.float64(3),
        'meanInt64': np.int64(3)
    },
    {
        'sample': [2, 2, 2],
        'predstot': 1000,
        'predsdim': 2,
        'len': 1000,
        'mean': np.float64(2),
        'meanInt64': np.int64(2)
    },
    {
        'sample': [1, 1, 1],
        'predstot': 9999,
        'predsdim': 3,
        'len': 9999,
        'mean': np.float64(1),
        'meanInt64': np.int64(1)
    },
]

results = []
resultsInt64 = []


class BootstrapTestCase(unittest.TestCase):
    """ docstring """
    def setUp(self):
        for i in range(len(test_cases)):
            results.append(
                bootstrap(
                    test_cases[i]['sample'],
                    test_cases[i]['predstot'],
                    test_cases[i]['predsdim']
                )
            )

            resultsInt64.append(
                bootstrap(
                    test_cases[i]['sample'],
                    test_cases[i]['predstot'],
                    test_cases[i]['predsdim'],
                    True
                )
            )

    def test_len(self):
        """ test for boostrap helper"""
        for i in range(len(test_cases)):
            self.assertEqual(len(results[i]), test_cases[i]['len'])
            self.assertEqual(len(resultsInt64[i]), test_cases[i]['len'])

    def test_value(self):
        """ docstring """
        for i in range(len(test_cases)):
            for j in range(len(results[i])):
                self.assertEqual(results[i][j], test_cases[i]['mean'])
                self.assertEqual(resultsInt64[i][j], test_cases[i]['meanInt64'])
                self.assertIsInstance(results[i][j], np.float64)
                self.assertIsInstance(resultsInt64[i][j], np.int64)

    def test_less(self):
        """ docstring """
        for i in range(len(test_cases)):
            for j in range(len(results[i])):
                self.assertLessEqual(results[i][j], max(test_cases[i]['sample']))

    def test_greater(self):
        """ docstring """
        for i in range(len(test_cases)):
            for j in range(len(results[i])):
                self.assertGreaterEqual(results[i][j], min(test_cases[i]['sample']))

if __name__ == '__main__':
    unittest.main()