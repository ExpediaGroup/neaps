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

from functions import delivery_time

test_cases = [
    {
        'data': [[3, 3, 3], 1, 3],
        'result': 9
    },
    {
        'data': [[3, 3, 3], 1, 10],
        'result': 30
    },
    {
        'data': [[3, 3, 3], 2, 3],
        'result': 6
    },
    {
        'data': [[3, 3, 3], 3, 3],
        'result': 3
    },
]

results = []


class DeliveryTimeTestCase(unittest.TestCase):
    """ docstring """
    def setUp(self):
        for i in range(len(test_cases)):
            results.append(
                delivery_time(
                    test_cases[i]['data']
                )
            )

    def test_result(self):
        """ docstring """
        for i in range(len(test_cases)):
            self.assertEqual(results[i], test_cases[i]['result'])

if __name__ == '__main__':
    unittest.main()

# tests_sc = [
#         {
#         'num': np.float64(3),
#         'wip': 1,
#         'runsdim': np.float64(10),
#         'runstot': 1000,
#         'fun': 1
#         },
#         {
#         'num': np.float64(3),
#         'wip': 2,
#         'runsdim': np.float64(10),
#         'runstot': 1000,
#         'fun': 1
#         },
#         {
#         'num': np.float64(3),
#         'wip': 3,
#         'runsdim': np.float64(10),
#         'runstot': 1000,
#         'fun': 1
#         },
#         {
#         'num': np.float64(4),
#         'wip': 1,
#         'runsdim': np.float64(10),
#         'runstot': 500,
#         'fun': 1
#         },
#         {
#         'num': np.float64(4),
#         'wip': 2,
#         'runsdim': np.float64(10),
#         'runstot': 500,
#         'fun': 1
#         },
#         {
#         'num': np.float64(4),
#         'wip': 3,
#         'runsdim': np.float64(10),
#         'runstot': 500,
#         'fun': 1
#         },
#         {
#         'num': np.float64(3),
#         'wip': 1,
#         'runsdim': np.float64(20),
#         'runstot': 1500,
#         'fun': 1
#         },
#         {
#         'num': np.float64(3),
#         'wip': 2,
#         'runsdim': np.float64(20),
#         'runstot': 1500,
#         'fun': 1
#         },
#         {
#         'num': np.float64(3),
#         'wip': 3,
#         'runsdim': np.float64(20),
#         'runstot': 1500,
#         'fun': 1
#         }
#     ]

# results_sc = []
# montecarlo_results_sc = []

# results_expected_sc = [
#     4,
#     7,
#     10,
#     3,
#     5,
#     7,
#     7,
#     13,
#     19
# ]

# tots_expected_sc = [
#     1000,
#     1000,
#     1000,
#     500,
#     500,
#     500,
#     1500,
#     1500,
#     1500
# ]

# for i in range(len(tests_sc)):
#     results_sc.append(
#         result(
#             tests_sc[i]['num'],
#             tests_sc[i]['wip'],
#             tests_sc[i]['runsdim'],
#             tests_sc[i]['runstot'],
#             tests_sc[i]['fun']
#         )
#     )
#     montecarlo_results_sc.append(
#         stories_completed(
#         (
#         [tests_sc[i]['num']],
#         tests_sc[i]['wip'],
#         tests_sc[i]['runsdim']
#         )
#         )
#     )

# class Test_stories_completed:
#     """ test for boostrap helper"""
#     for i in range(len(tests_sc)):
#         def test_length(self):
#             assert len(results_sc[i]) == tots_expected_sc[i]

#         def test_mean(self):
#             for j in range(len(results_sc[i])):
#                 assert results_sc[i][j] == results_expected_sc[i]

# class Test_montecarlo_stories_completed:
#     """ test for boostrap helper"""
#     for i in range(len(tests_sc)):
#         def test_mean(self):
#             assert montecarlo_results_sc[i] == results_expected_sc[i]

# tests_sn = [
#         {
#         'num': np.float64(3),
#         'wip': 1,
#         'runsdim': np.float64(10),
#         'runstot': 1000,
#         'fun': 2
#         },
#         {
#         'num': np.float64(3),
#         'wip': 2,
#         'runsdim': np.float64(10),
#         'runstot': 1000,
#         'fun': 2
#         },
#         {
#         'num': np.float64(3),
#         'wip': 3,
#         'runsdim': np.float64(10),
#         'runstot': 1000,
#         'fun': 2
#         },
#         {
#         'num': np.float64(4),
#         'wip': 1,
#         'runsdim': np.float64(10),
#         'runstot': 500,
#         'fun': 2
#         },
#         {
#         'num': np.float64(4),
#         'wip': 2,
#         'runsdim': np.float64(10),
#         'runstot': 500,
#         'fun': 2
#         },
#         {
#         'num': np.float64(4),
#         'wip': 3,
#         'runsdim': np.float64(10),
#         'runstot': 500,
#         'fun': 2
#         },
#         {
#         'num': np.float64(3),
#         'wip': 1,
#         'runsdim': np.float64(20),
#         'runstot': 1500,
#         'fun': 2
#         },
#         {
#         'num': np.float64(3),
#         'wip': 2,
#         'runsdim': np.float64(20),
#         'runstot': 1500,
#         'fun': 2
#         },
#         {
#         'num': np.float64(3),
#         'wip': 3,
#         'runsdim': np.float64(20),
#         'runstot': 1500,
#         'fun': 2
#         }
#     ]

# results_sn = []
# montecarlo_results_sn = []

# results_expected_sn = [
#     4,
#     2,
#     2,
#     3,
#     2,
#     1,
#     7,
#     4,
#     3
# ]

# tots_expected_sn = [
#     1000,
#     1000,
#     1000,
#     500,
#     500,
#     500,
#     1500,
#     1500,
#     1500
# ]

# for i in range(len(tests_sn)):
#     results_sn.append(
#         result(
#             tests_sn[i]['num'],
#             tests_sn[i]['wip'],
#             tests_sn[i]['runsdim'],
#             tests_sn[i]['runstot'],
#             tests_sn[i]['fun']
#         )
#     )
#     montecarlo_results_sn.append(
#         sprints_needed(
#         (
#         [tests_sn[i]['num']],
#         tests_sn[i]['wip'],
#         tests_sn[i]['runsdim']
#         )
#         )
#     )

# class Test_sprints_needed:
#     """ test for boostrap helper"""
#     for i in range(len(tests_sn)):
#         def test_length(self):
#             assert len(results_sn[i]) == tots_expected_sn[i]

#         def test_mean(self):
#             for j in range(len(results_sn[i])):
#                 assert results_sn[i][j] == results_expected_sn[i]

# class Test_montecarlo_sprints_needed:
#     """ test for boostrap helper"""
#     for i in range(len(tests_sn)):
#         def test_mean(self):
#             assert montecarlo_results_sn[i] == results_expected_sn[i]

# tests_bt = [
#         {
#         'sample': [np.float64(3) for x in range(10)],
#         'predstot': 500,
#         'predsdim': 1,
#         },
#         {
#         'sample': [np.float64(4) for x in range(10)],
#         'predstot': 750,
#         'predsdim': 5,
#         },
#         {
#         'sample': [np.float64(5) for x in range(10)],
#         'predstot': 1000,
#         'predsdim': 10,
#         },
#     ]

# results_bt = []

# results_expected_bt = [
#     3,
#     4,
#     5
# ]


# tots_expected_bt = [
#     500,
#     750,
#     1000
# ]

# for i in range(len(tests_bt)):
#     results_bt.append(
#         bootstrap(
#             tests_bt[i]['sample'],
#             tests_bt[i]['predstot'],
#             tests_bt[i]['predsdim']
#         )
#     )

# class Test_bootstrap:
#     """ test for boostrap helper"""
#     for i in range(len(tests_bt)):
#         def test_length(self):
#             assert len(results_bt[i]) == tots_expected_bt[i]

#         def test_mean(self):
#             assert np.mean(results_bt[i]) == results_expected_bt[i]

#         def test_max(self):
#             assert np.amax(results_bt[i]) == results_expected_bt[i]

#         def test_min(self):
#             assert np.amin(results_bt[i]) == results_expected_bt[i]
