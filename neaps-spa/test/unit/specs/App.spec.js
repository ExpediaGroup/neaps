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

import Vue from 'vue'
import App from 'src/App'

describe('App.vue', () => {
  beforeEach(function () {
    $('body').append('<div>')
    window.vm = new Vue({
      template: '<app></app>',
      components: { App }
    }).$mount('div')
  })

  afterEach(function () {
    window.vm.$options.components.App.store.replaceState(
      {
        firstRun: true,
        type: '0',
        legs: [],
        tickets: []
      }
    )
    window.vm.$destroy()
    $('body').empty()
    window.vm = undefined
  })

  it('simulation type changes', (done) => {
    let simulation = window.vm.$options.components.App.store.state.type
    expect(simulation).to.equal(0)

    window.vm.$options.components.App.store._actions.setType[0](1)

    window.vm.$nextTick(() => {
      let simulation = window.vm.$options.components.App.store.state.type
      expect(simulation).to.equal(1)
      window.vm.$options.components.App.store._actions.setType[0](2)

      window.vm.$nextTick(() => {
        let simulation = window.vm.$options.components.App.store.state.type
        expect(simulation).to.equal(2)
        done()
      })
    })
  })

  it('add legs', (done) => {
    let legNum = window.vm.$options.components.App.store.state.legs.length
    expect(legNum).to.equal(1)
    window.vm.$options.components.App.store._actions.addLeg[0]()

    window.vm.$nextTick(() => {
      let legNum = window.vm.$options.components.App.store.state.legs.length
      expect(legNum).to.equal(2)
      window.vm.$options.components.App.store._actions.addLeg[0]()

      window.vm.$nextTick(() => {
        let legNum = window.vm.$options.components.App.store.state.legs.length
        expect(legNum).to.equal(3)
        done()
      })
    })
  })

  it('check first run', (done) => {
    let legNum = window.vm.$options.components.App.store.state.firstRun
    expect(legNum).to.equal(true)
    window.vm.$options.components.App.store._actions.disableFirstRun[0]()

    window.vm.$nextTick(() => {
      let legNum = window.vm.$options.components.App.store.state.firstRun
      expect(legNum).to.equal(false)
      done()
    })
  })
})
