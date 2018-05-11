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

def labels_gen(number, total):
    """ Generates labels for summary table """
    count = 0
    while count < number:
        if count == 0 and not total:
            yield 'N°'
        elif count == 0 and number == 1 and total:
            yield 'Tot'
        elif count == number - 1 and total:
            yield 'Tot'
        elif not total:
            yield str(count)
        else:
            yield str(count + 1)

        count += 1
