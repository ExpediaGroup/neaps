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
  #inserter-wrapper {
    position: static;
    border-radius: 4px;
  }
  #type {
    text-align: center;
    padding: 20px 0;
    background: #f3f3f3;

    select {
      margin-bottom: 0;
    }
  }
  #legs {
    .row {
      border-bottom: 1px solid #f3f3f3;
      padding: 10px 0;
    }
    .name {
      line-height: 50px;
      text-align: center;
      font-size: 24px;
    }
    .label {
      margin: 5px 0 0 0;
      font-size: 12px;
    }
    input {
      margin-bottom: 5px;
    }
    .not-validated {
      input {
        border: 1px solid #f00;
      }
      label {
        color: #f00;
      }
    }   
    .unit {
      font-size: 11px;
      display: block;
      padding: 5px 0;
    }
    .remove {
      line-height: 90px;
      text-align: center;
      font-size: 24px;
      a {
        text-decoration: none;
      }
    }
    .add {
      font-size: 14px;
      margin: 20px;
      display: inline-block;
      text-decoration: none;
    }
    .techDebtContainer {
      float: left;
      width: 50%;
    }
  }
</style>

<template>
  <div id="inserter-wrapper" class="row u-full-width">
    <div id="inserter">
      <div id="type">
        Simulation: 
        <select id="simulatioTypeSelect" @change="setSimulationType">
          <option value="0">Kanban: I would like to forecast the N° of Days to Delivery a given number of stories</option>
          <option value="1">Kanban: I would like to forecast the N° of Stories Done in given number of days</option>
          <option value="2">Scrum: I would like to forecast the N° of Sprints to Delivery a given number of stories</option>
        </select>
      </div>
      <div id="legs">
        <div class="row" v-bind:id="'leg'+index" v-bind:key="leg.index" v-for="(leg, index) in getLegs">
          <div class="one column name">
            {{ index + 1 }}
          </div>
          <div class="four columns" v-bind:class="{ 'not-validated': !leg.sampleValidation }">
            <label class="label">Historical Sample</label>
            <span class="unit">{{ legLabels.sample }}</span>
            <input @input="validateSample($event, index)" v-bind:id="'leg'+index+'_sample' "placeholder="1,2,3,4,5" v-model="leg.sample" class="u-full-width" type="text">
          </div>
          <div class="onehalf columns" v-bind:class="{ 'not-validated': !leg.runsdimValidation,  'four': teamType }">
            <label class="label">Target</label>
            <span class="unit">{{ legLabels.target }}</span>
            <input @input="validateTarget($event, index)" v-bind:id="'leg'+index+'_target' "placeholder="5" v-model.number="leg.runsdim" class="u-full-width" type="number">
          </div>
          <div class="onehalf columns" v-show="getType!=2" v-bind:class="{ 'not-validated': !leg.wipValidation }">
            <label class="label">WIP</label>
            <span class="unit">{{ legLabels.wip }}</span>
            <input v-on:input="validateWip($event, index)" v-bind:id="'leg'+index+'_wip'" placeholder="5" v-model="leg.wip" class="u-full-width" type="number">
          </div>
          <div class="three columns">
            <label class="label">Tech Debt Simulation</label>
            <div class="techDebtContainer">
              <span class="unit">Minimun</span>
              <select v-bind:id="'techDebtMin'+index" @change="setTechDebtLow($event, index)">
                <option value="0.0">0%</option>
                <option value="0.1">10%</option>
                <option value="0.2">20%</option>
                <option value="0.3">30%</option>
                <option value="0.4">40%</option>
              </select>
            </div>
            <div class="techDebtContainer">
              <span class="unit">Maximum</span>
              <select v-bind:id="'techDebtMax'+index" @change="setTechDebtHigh($event, index)">
                <option value="0.0">0%</option>
                <option value="0.1">10%</option>
                <option value="0.2">20%</option>
                <option value="0.3">30%</option>
                <option value="0.4">40%</option>
                <option value="0.5">50%</option>
                <option value="0.6">60%</option>
              </select>
            </div>
          </div>
          <div class="one column remove">
            <a href="#" class="icon-minus-circled" @click.prevent="removeLeg(index)" v-show="singleLeg"></a>
          </div>
        </div>
        <a id="addLeg" class="add icon-plus-squared" href="#" @click.prevent="addLeg"> Add Group</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import labelsInserter from './labelsInserter'

const updateTechDebtHigh = (value, el, opts) => {
  let index = value * 10
  if (value !== '0.0') {
    index += 1
  }
  el.selectedIndex = index
  for (let i = 0; i < opts.length; i++) {
    if (i < index) {
      opts[i].disabled = true
    } else {
      opts[i].disabled = false
    }
  }
}

export default {
  mounted: function () {
    this.addLeg()
  },
  // data: function () {
  //   return {
  //     simulationType: 0
  //   }
  // },
  computed: {
    singleLeg: function () {
      if (this.getLegs.length === 1) {
        return false
      } else {
        return true
      }
    },
    legLabels: function () {
      return labelsInserter[this.getType]
    },
    ...mapGetters([
      'isFirstRun',
      'getType',
      'getLegs'
    ])
  },
  methods: {
    setSimulationType: function (event) {
      console.log('changing simulation')
      let value = event.target.value
      this.setType(value)
      if (this.getType === '2') {
        this.updateWipAll(1)
        for (let i = 0; i < this.getLegs.length; i++) {
          this.validateWip('1', i)
        }
      }
      return this.getType
    },
    startValidation: function (index, type) {
      if (this.isFirstRun) {
        // this.disableFirstRun()
        for (let i = 0; i < this.getLegs.length; i++) {
          if (i === index && type === 0) {
            this.updateTargetValidation({ index, 'value': false })
            this.updateWipValidation({ index, 'value': false })
          } else if (i === index && type === 1) {
            this.updateSampleValidation({ index, 'value': false })
            this.updateWipValidation({ index, 'value': false })
          } else if (i === index && type === 2) {
            this.updateSampleValidation({ index, 'value': false })
            this.updateTargetValidation({ index, 'value': false })
          } else {
            this.updateSampleValidation({ 'index': i, 'value': false })
            this.updateTargetValidation({ 'index': i, 'value': false })
            this.updateWipValidation({ 'index': i, 'value': false })
          }
        }
        this.disableFirstRun()
      }
    },
    validateSample: function (e, index) {
      this.startValidation(index, 0)
      if (e.target.value !== '' && e.target.value.match(/^[0-9]+(,[0-9]+)*$/) == null) {
        this.updateSampleValidation({ index, 'value': false })
      } else {
        this.updateSampleValidation({ index, 'value': true })
      }
    },
    validateTarget: function (e, index) {
      this.startValidation(index, 1)
      // this.disableFirstRun()
      if (e.target.value <= 0 || e.target.value.match(/^[\d]+[\s]*$/) == null) {
        this.updateTargetValidation({ index, 'value': false })
      } else {
        this.updateTargetValidation({ index, 'value': true })
      }
    },
    validateWip: function (e, index) {
      this.startValidation(index, 2)

      let value = ''

      if (e.target) {
        value = e.target.value
      } else {
        value = e
      }

      if (value <= 0 || value.match(/^[\d]+[\s]*$/) == null) {
        this.updateWipValidation({ index, 'value': false })
      } else {
        this.updateWipValidation({ index, 'value': true })
      }
    },
    setTechDebtLow: function (event, index) {
      const id = 'techDebtMax' + index
      const el = document.getElementById(id)
      const opts = el.options
      const value = event.target.value
      updateTechDebtHigh(value, el, opts)
      this.updateTDLowBound({ index, value })
      const valueMax = Math.round((Number(value) + 0.1) * 10) / 10
      this.updateTDHighBound({ index, value: valueMax })
    },
    setTechDebtHigh: function (event, index) {
      const value = event.target.value
      this.updateTDHighBound({ index, value })
    },
    ...mapActions([
      'disableFirstRun',
      'setType',
      'addLeg',
      'removeLeg',
      'updateSampleValidation',
      'updateTargetValidation',
      'updateWipAll',
      'updateWipValidation',
      'updateTDLowBound',
      'updateTDHighBound'
    ])
  }
}
</script>
