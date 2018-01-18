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

class Stack(object):
    items = np.array([])
    tot = 0

    def __init__(self, tot_integer=False):
        self.items = []

        if tot_integer == True:
            self.tot = np.int64(0)
        else:
            self.tot = np.float64(0)

    def add_item(self, x):
        self.items = np.append(self.items, x)
        self.tot += x

    def get_tot(self):
        return self.tot

    def get_count(self):
        return self.items.shape[0]

    def __repr__(self):
        return str(self.tot)

    def __int__(self):
        return self.tot

    def __lt__(self, stack):
        if isinstance(stack, int):
            return self.get_tot() < stack
        else:
            return self.get_tot() < stack.get_tot()

    def __le__(self, stack):
        if isinstance(stack, int):
            return self.get_tot() <= stack
        else:
            return self.get_tot() <= stack.get_tot()

    def __gt__(self, stack):
        if isinstance(stack, int):
            return self.get_tot() > stack
        else:
            return self.get_tot() > stack.get_tot()

    def __ge__(self, stack):
        if isinstance(stack, int):
            return self.get_tot() >= stack
        else:
            return self.get_tot() >= stack.get_tot()

    def __add__(self, stack):
        if isinstance(stack, int):
            return self.get_tot() + stack
        else:
            return self.get_tot() + stack.get_tot()

    def __radd__(self, stack):
        return self.get_tot() + stack

class StackCluster(object):
    stacks = np.array([])

    def __init__(self):
        self.stacks = []

    def add_stack(self, tot_integer=False):
        if tot_integer == True:
            self.stacks = np.append(self.stacks, Stack(tot_integer))
        else:
            self.stacks = np.append(self.stacks, Stack())

    def get_stack(self, index):
        return self.stacks[index]

    def get_smaller_stack(self):
        index = self.stacks.argmin()

        return self.stacks[index]

    def get_bigger_stack(self):
        index = self.stacks.argmax()

        return self.stacks[index]

    def get_tot(self):
        tot = 0

        for (i, stack) in enumerate(self.stacks):
            tot += stack.get_tot()
        
        return tot

    def get_count(self):
        out = 0

        for i in range(len(self.stacks)):
            out += self.stacks[i].get_count()

        return out
