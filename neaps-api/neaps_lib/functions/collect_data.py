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

from neaps_lib.functions.get_simulation_results import get_simulation_results

def collect_data(predstot, runstot, chunksin, fun):
    chunks = []
    requests = []
    debts = []

    for chunk in chunksin:
        predsdim = int(len(chunk['sample']) / 4) + 1

        request = {
            'sample': chunk['sample'],
            'wip': chunk['wip'],
            'predstot': predstot,
            'predsdim': predsdim,
            'runstot': runstot,
            'runsdim': chunk['runsdim'],
            'td_low_bound': chunk['td_low_bound'],
            'td_high_bound': chunk['td_high_bound'],
            'fun': fun
        }

        out = get_simulation_results(
            chunk['sample'],
            chunk['wip'],
            predstot,
            predsdim,
            runstot,
            chunk['runsdim'],
            chunk['td_low_bound'],
            chunk['td_high_bound'],
            fun
        )

        chunks.append(out[0])
        debts.append(out[1])
        requests.append(request)

    return (requests, chunks, debts)