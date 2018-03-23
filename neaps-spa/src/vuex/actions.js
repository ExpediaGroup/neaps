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

const actions = {
  disableFirstRun ({ commit, dispatch, state }) {
    commit('FIRST_RUN_DISABLE')
  },
  setType ({ commit, dispatch, state }, value) {
    console.log('set type value: ' + value)
    commit('TYPE_SET', value)
  },
  setValidated ({ commit, dispatch, state }, value) {
    commit('VALIDATED_SET', value)
  },
  addLeg ({ commit, dispatch, state }) {
    let defaultLeg
    if (state.firstRun) {
      defaultLeg = {
        sample: '',
        runsdim: '',
        wip: 1,
        td_low_bound: 0.0,
        td_high_bound: 0.0
        // sampleValidation: true,
        // runsdimValidation: true,
        // wipValidation: true
      }
    } else {
      defaultLeg = {
        sample: '',
        runsdim: '',
        wip: 1,
        td_low_bound: 0.0,
        td_high_bound: 0.0
        // sampleValidation: false,
        // runsdimValidation: false,
        // wipValidation: true
      }
    }
    commit('LEG_ADD', defaultLeg)
  },
  updateLeg ({ commit, dispatch, state }, {leg, index}) {
    commit('LEG_UPDATE', {index, leg})
  },
  removeLeg ({ commit, dispatch, state }, i) {
    commit('LEG_REMOVE', i)
  },
  updateSample ({ commit, dispatch, state }, { event, index }) {
    console.log(event)
    let value = event.target.value
    commit('LEG_SAMPLE', { index, value })
  },
  // updateSampleValidation ({ commit, dispatch, state }, { index, value }) {
  //   commit('LEG_SAMPLE_VALIDATION', { index, value })
  // },
  updateTarget ({ commit, dispatch, state }, { event, index }) {
    let value = Number(event.target.value)
    commit('LEG_TARGET', { index, value })
  },
  // updateTargetValidation ({ commit, dispatch, state }, {index, value}) {
  //   commit('LEG_TARGET_VALIDATION', { index, value })
  // },
  updateWip ({ commit, dispatch, state }, { event, index }) {
    let value = Number(event.target.value)
    commit('LEG_WIP', { index, value })
  },
  updateWipAll ({ commit, dispatch, state }, value) {
    commit('LEG_WIP_ALL', value)
  },
  // updateWipValidation ({ commit, dispatch, state }, {index, value}) {
  //   commit('LEG_WIP_VALIDATION', {index, value})
  // },
  updateTDLowBound ({ commit, dispatch, state }, { index, value }) {
    value = Number(value)
    commit('LEG_TD_LOW', { index, value })
  },
  updateTDHighBound ({ commit, dispatch, state }, { index, value }) {
    value = Number(value)
    commit('LEG_TD_HIGH', { index, value })
  },
  addTicket ({ commit, dispatch, state }, ticket) {
    commit('TICKET_ADD', ticket)
  },
  removeTicket ({ commit, dispatch, state }, i) {
    commit('TICKET_REMOVE', i)
  }
}

export default actions
