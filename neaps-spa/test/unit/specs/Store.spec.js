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

// import Vue from 'vue'
import Store from 'src/vuex/store'

const emptyLeg = {
  sample: '',
  runsdim: NaN,
  wip: NaN,
  td_low_bound: 0.0,
  td_high_bound: 0.0,
  sampleValidation: true,
  runsdimValidation: true,
  wipValidation: true
}

describe('Vuex Store', () => {
  beforeEach(function () {
  })

  afterEach(function () {
    Store.replaceState({
      firstRun: true,
      type: '0',
      legs: [],
      tickets: []
    })
  })

  it('state type changes', (done) => {
    Store._actions.setType[0](1)
    expect(Store.state.type).to.equal(1)

    Store._actions.setType[0](2)
    expect(Store.state.type).to.equal(2)

    done()
  })

  it('add and remove leg', (done) => {
    Store._actions.addLeg[0](emptyLeg)
    expect(Store.state.legs.length).to.equal(1)

    Store._actions.addLeg[0](emptyLeg)
    expect(Store.state.legs.length).to.equal(2)

    Store._actions.removeLeg[0](0)
    expect(Store.state.legs.length).to.equal(1)

    Store._actions.removeLeg[0](0)
    expect(Store.state.legs.length).to.equal(0)

    done()
  })

  it('update leg sample', (done) => {
    Store._actions.addLeg[0](emptyLeg)
    Store._actions.addLeg[0](emptyLeg)

    let e0 = [
      {
        'target': {
          'value': [1, 2, 3]
        }
      },
      {
        'target': {
          'value': [9, 9, 9]
        }
      },
      {
        'target': {
          'value': undefined
        }
      }
    ]

    let e1 = [
      {
        'target': {
          'value': [9, 9, 9]
        }
      },
      {
        'target': {
          'value': [1, 2, 3]
        }
      },
      {
        'target': {
          'value': undefined
        }
      }
    ]
    for (let i = 0, len = e0.length; i < len; ++i) {
      Store._actions.updateSample[0]({
        'event': e0[i],
        'index': 0
      })

      Store._actions.updateSample[0]({
        'event': e1[i],
        'index': 1
      })

      expect(Store.state.legs[0].sample).to.equal(e0[i].target.value)
      expect(Store.state.legs[1].sample).to.equal(e1[i].target.value)
    }

    done()
  })

  it('update leg target', (done) => {
    Store._actions.addLeg[0](emptyLeg)
    Store._actions.addLeg[0](emptyLeg)

    let e0 = [
      {
        'target': {
          'value': 0
        }
      },
      {
        'target': {
          'value': 1000
        }
      },
      {
        'target': {
          'value': 9
        }
      }
    ]

    let e1 = [
      {
        'target': {
          'value': 1000
        }
      },
      {
        'target': {
          'value': 0
        }
      },
      {
        'target': {
          'value': 9
        }
      }
    ]

    for (let i = 0, len = e0.length; i < len; ++i) {
      Store._actions.updateTarget[0]({
        'event': e0[i],
        'index': 0
      })

      Store._actions.updateTarget[0]({
        'event': e1[i],
        'index': 1
      })

      expect(Store.state.legs[0].runsdim).to.equal(e0[i].target.value)
      expect(Store.state.legs[1].runsdim).to.equal(e1[i].target.value)
    }

    done()
  })

  it('update leg wip', (done) => {
    Store._actions.addLeg[0](emptyLeg)
    Store._actions.addLeg[0](emptyLeg)

    let e0 = [
      {
        'target': {
          'value': 0
        }
      },
      {
        'target': {
          'value': 1000
        }
      },
      {
        'target': {
          'value': 9
        }
      }
    ]

    let e1 = [
      {
        'target': {
          'value': 1000
        }
      },
      {
        'target': {
          'value': 0
        }
      },
      {
        'target': {
          'value': 9
        }
      }
    ]

    for (let i = 0, len = e0.length; i < len; ++i) {
      Store._actions.updateWip[0]({
        'event': e0[i],
        'index': 0
      })

      Store._actions.updateWip[0]({
        'event': e1[i],
        'index': 1
      })

      expect(Store.state.legs[0].wip).to.equal(e0[i].target.value)
      expect(Store.state.legs[1].wip).to.equal(e1[i].target.value)
    }

    done()
  })
})
