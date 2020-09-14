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

<style lang="scss">
  #tickets-wrapper {
    position: static;
  }
  #cta {
    text-align: center;
    margin: -50px 0 15px 0;

    .disabled {
      opacity: 0.5;
      cursor: default;
      &:hover {
        color: #FFF;
        background-color: #33C3F0;
        border-color: #33C3F0;
      }
    }
  }
  #tickets {
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 18px;
    }
    .ticket {
      margin-bottom: 30px;
      background: #f3f3f3;
      padding: 20px;
      border-radius: 4px;
    }
    .number {
      font-weight: bold;
    }
    .scenario {
      font-style: italic;
      background: #fff;
    }
    .center {
      text-align: center;
    }
    .label {
      display: inline-block;
      background: #eee;
      padding: 4px 10px;
      margin: 0 10px;
      text-transform: uppercase;
      font-size: 12px;
      border-radius: 4px;
      font-style: normal;
      font-weight: bold;
    }
    .unit {
      color: black;
      font-size: 11px;
    }
    .incatious {
      color: red;
    }
    .three {
      color: #f80;
    }
    .safe {
      color: #0a0;
    }
    .no-montecarlo {
      background: #f00;
      color: white;
    }
    .attribute {
      background: #0a0;
      color: white;
    }
  }
</style>

<template>
  <div id="tickets-wrapper">
    <div id="cta">
      <button id="cta_button" @click="runSimulation(getTickets.length)" class="button-primary" v-bind:class="{ 'disabled': !isValidated || (getTickets[0] && getTickets[0].loading) }">Run Simulation</button>
    </div>
    <div id='tickets'>
        <div v-bind:id="'ticket' + index" :key="ticket.index" v-for="(ticket, index) in getTickets" class="row ticket">
          <template v-if="ticket.loading">
            <h1><span class="icon-spin1 animate-spin"></span> Simulation {{ getTickets.length - index }} - Running...</h1>
          </template>
          <template v-else>
            <h1>Simulation {{ getTickets.length - index }}</h1>
            <h2>{{ getLabels(index).type }}</h2>
            <table class="u-full-width">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Sample</th>
                  <th>Target</th>
                  <th v-if="ticket.fun != 2">Wip</th>
                  <th class="incatious">
                    Incatious Scenario <br/>
                    <span class="unit">({{ getLabels(index).unit }})</span>
                  </th>
                  <th class="three">
                    Three/Quarters Scenario <br/>
                    <span class="unit">({{ getLabels(index).unit }})</span>
                  </th>
                  <th class="safe">
                    Safe Scenario <br/>
                    <span class="unit">({{ getLabels(index).unit }})</span>
                  </th>
                  <th>Attributes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-bind:id="'line' + index" class="row" v-bind:class="{ 'montecarlo': !line.montecarlo }" :key="line.index" v-for="(line, index) in ticket.table">
                  <td class="number">{{ line.name }}</td>
                  <td><span v-if="line.request">{{ line.request.sample }}</span></td>
                  <td><span v-if="line.request">{{ line.request.runsdim }}</span></td>
                  <td v-if="ticket.fun != 2"><span v-if="line.request">{{ line.request.wip }}</span></td>

                  <template v-if="line.montecarlo">
                    <td class="scenario">{{ line.low }}</td>
                    <td class="scenario">{{ line.medium }}</td>
                    <td class="scenario">{{ line.high }}</td>
                  </template>

                  <template v-else>
                    <td colspan="3" class="scenario center">
                      {{ line.medium }}
                      <span class="label no-montecarlo">No Montecarlo Simulation (Unvariant sample)</span>
                    </td>
                  </template>
                  
                  <td>
                      <span class="label attribute" v-if="line.longest">Longest</span>
                      <span class="label attribute" v-if="line.shortest">Shortest</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
import sa from 'superagent'

import { mapGetters, mapActions } from 'vuex'
import labelsSimulations from './labelsSimulations'

const genRequest = function (legs, type) {
  return {
    'chunks': legs,
    'fun': type,
    'predstot': 1000,
    'runstot': 20000
  }
}

const genTicket = function (url, req) {
  return new Promise((resolve, reject) => {
    sa
    .post(url)
    .type('application/json')
    .send(req)
    .end(function (err, res) {
      err ? reject(err) : resolve(res)
    })
  })
}

export default {
  computed: {
    ...mapGetters([
      'isFirstRun',
      'isValidated',
      'getType',
      'getLegs',
      'getTickets'
    ])
  },
  methods: {
    runSimulation (e, last) {
      if (this.allValidated === false) {
        throw new Error('Data are not validated')
      }
      if (this.getTickets[0] && this.getTickets[0].loading) {
        throw new Error('Simulation running.')
      }
      console.log(last)
      const legs = this.getLegs
      console.log(this.getType)
      const url = '/api'
      const req = genRequest(legs, this.getType)
      console.log(url)
      console.log(req)

      this.addTicket({
        loading: true
      })

      const ticket = genTicket(url, req)

      ticket.then(function (res) {
        this.removeTicket(last)
        this.addTicket(res.body)
      }.bind(this))
    },
    getLabels (i) {
      return labelsSimulations[this.getTickets[i].fun]
    },
    ...mapActions([
      'addTicket',
      'removeTicket'
    ])
  }
}
</script>
