/*

Copyright 2018 Expedia Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Create an object storing various mutations. We will write the mutation
const mutations = {
  // A mutation receives the current state as the first argument
  // You can make any modifications you want inside this function
  FIRST_RUN_DISABLE (state) {
    state.firstRun = false
  },
  TYPE_SET (state, value) {
    state.type = value
  },
  VALIDATED_SET (state, value) {
    state.validated = value
  },
  LEG_ADD (state, object) {
    state.legs.push(object)
  },
  LEG_UPDATE (state, { index, leg }) {
    state.legs[index] = leg
  },
  LEG_REMOVE (state, index) {
    state.legs.splice(index, 1)
  },
  LEG_SAMPLE (state, { index, value }) {
    state.legs[index].sample = value
  },
  LEG_SAMPLE_VALIDATION (state, { index, value }) {
    state.legs[index].sampleValidation = value
  },
  LEG_TARGET (state, { index, value }) {
    state.legs[index].runsdim = value
  },
  LEG_TARGET_VALIDATION (state, { index, value }) {
    state.legs[index].runsdimValidation = value
  },
  LEG_WIP (state, { index, value }) {
    state.legs[index].wip = value
  },
  LEG_WIP_ALL (state, value) {
    for (let leg of state.legs) {
      leg.wip = value
    }
  },
  LEG_WIP_VALIDATION (state, { index, value }) {
    state.legs[index].wipValidation = value
  },
  LEG_TD_LOW (state, { index, value }) {
    state.legs[index].td_low_bound = value
  },
  LEG_TD_HIGH (state, { index, value }) {
    state.legs[index].td_high_bound = value
  },
  TICKET_ADD (state, object) {
    state.tickets.push(object)
  },
  TICKET_REMOVE (state, index) {
    state.tickets.splice(index, 1)
  }
}

export default mutations
