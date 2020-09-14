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
from classes import Stack, StackCluster

class StackTestCase(unittest.TestCase):
    """ docstring """
    def setUp(self):
        self.stack = Stack()
        self.sample = range(1, 10)

        self.stackBigger = Stack()
        self.sampleBigger = range(11, 20)

        for (i, value) in enumerate(self.sample):
            print(self.sampleBigger[i])
            self.stack.add_item(value)
            self.stackBigger.add_item(self.sampleBigger[i])

        self.add = self.stackBigger + self.stack
        self.radd = self.stack + 5

    def test_length(self):
        self.assertEqual(self.stack.get_count(), len(self.sample))

    def test_tot(self):
        self.assertEqual(self.stack.get_tot(), sum(self.sample))

    def test_lower_bigger(self):
        self.assertLess(self.stack, self.stackBigger)
        self.assertGreaterEqual(self.stackBigger, self.stack)

    def test_add(self):
        self.assertEqual(self.add, 180)

    def test_radd(self):
        self.assertEqual(self.radd, 50)

class ClusterTestCase(unittest.TestCase):
    """ docstring """
    def setUp(self):
        sample0 = [1, 1, 1, 1, 1]
        sample1 = [2, 2, 2, 2]
        sample2 = [3, 3, 3]
        sample3 = [10, 11]

        self.count = len(sample0) + len(sample1) + len(sample2) + len(sample3)
        self.tot = np.float64(sum(sample0) + sum(sample1) + sum(sample2) + sum(sample3))
        self.totInt64 = np.int64(sum(sample0) + sum(sample1) + sum(sample2) + sum(sample3))

        self.clus = StackCluster()
        self.clusInt64 = StackCluster() 

        for i in range(4):
            self.clus.add_stack()
            self.clusInt64.add_stack(True)

        for i in range(len(sample0)):
            self.clus.get_stack(0).add_item(sample0[i])
            self.clusInt64.get_stack(0).add_item(sample0[i])
        for i in range(len(sample1)):
            self.clus.get_stack(1).add_item(sample1[i])
            self.clusInt64.get_stack(1).add_item(sample1[i])
        for i in range(len(sample2)):
            self.clus.get_stack(2).add_item(sample2[i])
            self.clusInt64.get_stack(2).add_item(sample2[i])
        for i in range(len(sample3)):
            self.clus.get_stack(3).add_item(sample3[i])
            self.clusInt64.get_stack(3).add_item(sample3[i])

    def test_smaller(self):
        small = self.clus.get_smaller_stack()
        self.assertIs(small, self.clus.get_stack(0))

    def test_bigger(self):
        big = self.clus.get_bigger_stack()
        self.assertIs(big, self.clus.get_stack(3))

    def test_count(self):
        self.assertEqual(self.clus.get_count(), self.count)

    def test_tot(self):
        self.assertEqual(self.clus.get_tot(), self.tot)
        self.assertEqual(self.clusInt64.get_tot(), self.totInt64)
        self.assertIsInstance(self.clus.get_tot(), np.float64)
        self.assertIsInstance(self.clusInt64.get_tot(), np.int64)

