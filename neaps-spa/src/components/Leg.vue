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
  #legs {
    .row {
      border-bottom: 1px solid #f3f3f3;
      padding: 10px 0;

      .internalRow {
        border: none;
      }
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
  <div class="leginserter">
    <div class="four columns" v-bind:class="{ 'not-validated': !sampleValidation && !isFirstRun }">
      <label class="label">Historical Sample</label>
      <span class="unit">{{ legLabels.sample }}</span>
      <input @input="validateSample($event)" v-bind:id="'leg'+index+'_sample' "placeholder="1,2,3,4,5" v-model="leg.sample" class="u-full-width" type="text">
      <div class="row internalRow">
        <Loader @sampleLoaded="loadSample"></Loader>
        <Saver v-bind:sample="leg.sample" v-show="sampleValidation"></Saver>
      </div>
    </div>
    <div class="onehalf columns" v-bind:class="{ 'not-validated': !runsdimValidation && !isFirstRun,  'three': getType == 2 }">
      <label class="label">Target</label>
      <span class="unit">{{ legLabels.target }}</span>
      <input @input="validateTarget($event)" v-bind:id="'leg'+index+'_target' "placeholder="5" v-model="leg.runsdim" class="u-full-width" type="number">
    </div>
    <div class="onehalf columns" v-show="getType!=2" v-bind:class="{ 'not-validated': !wipValidation && !isFirstRun }">
      <label class="label">WIP</label>
      <span class="unit">{{ legLabels.wip }}</span>
      <input @input="validateWip($event)" v-bind:id="'leg'+index+'_wip'" placeholder="5" v-model="leg.wip" class="u-full-width" type="number">
    </div>
    <div class="three columns">
      <label class="label">Tech Debt Simulation</label>
      <div class="techDebtContainer">
        <span class="unit">Minimun</span>
        <select v-bind:id="'techDebtMin'+index" @change="setTechDebtLow($event)">
          <option value="0.0">0%</option>
          <option value="0.1">10%</option>
          <option value="0.2">20%</option>
          <option value="0.3">30%</option>
          <option value="0.4">40%</option>
        </select>
      </div>
      <div class="techDebtContainer">
        <span class="unit">Maximum</span>
        <select v-bind:id="'techDebtMax'+index" @change="setTechDebtHigh($event)">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loader from './Loader.vue'
import Saver from './Saver.vue'
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
  components: {
    Loader,
    Saver
  },
  props: {
    leg: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      sampleValidation: false,
      wipValidation: true,
      runsdimValidation: false
    }
  },
  computed: {
    legLabels: function () {
      return labelsInserter[this.getType]
    },
    legValidated: function () {
      let sv = this.sampleValidation
      let wv = this.wipValidation
      let rv = this.runsdimValidation
      let value = sv && wv && rv
      this.$emit('changeValidation', this.index, value)
      return value
    },
    ...mapGetters([
      'isFirstRun',
      'getType'
    ])
  },
  methods: {
    loadSample: function (load) {
      let e = {}
      e['target'] = {}
      e['target']['value'] = load
      const index = this.index
      this.updateSample({ event: e, index })
      this.validateSample(e)
    },
    validateSample: function (e) {
      this.disableFirstRun()
      // this.startValidation(index, 0)
      if (e.target.value !== '' && e.target.value.match(/^[0-9]+(,[0-9]+)*$/) == null) {
        this.sampleValidation = false
      } else {
        this.sampleValidation = true
      }
      // this.$emit('change', this.leg, this.index)
      const index = this.index
      this.updateSample({ event: e, index })
      this.legValidated
    },
    validateTarget: function (e) {
      // this.startValidation(index, 1)
      this.disableFirstRun()
      if (e.target.value <= 0) {
        this.runsdimValidation = false
      } else {
        this.runsdimValidation = true
      }
      const index = this.index
      this.updateTarget({ event: e, index })
      this.legValidated
    },
    validateWip: function (e) {
      this.disableFirstRun()
      if (e.target.value <= 0) {
        this.wipValidation = false
      } else {
        this.wipValidation = true
      }
      const index = this.index
      this.updateWip({ event: e, index })
      this.legValidated
    },
    setTechDebtLow: function (event) {
      const index = this.index
      const id = 'techDebtMax' + index
      const el = document.getElementById(id)
      const opts = el.options
      const value = event.target.value
      updateTechDebtHigh(value, el, opts)
      this.updateTDLowBound({ index, value })
      const valueMax = Math.round((Number(value) + 0.1) * 10) / 10
      this.updateTDHighBound({ index, value: valueMax })
    },
    setTechDebtHigh: function (event) {
      const index = this.index
      const value = event.target.value
      this.updateTDHighBound({ index, value })
    },
    ...mapActions([
      'disableFirstRun',
      'updateWipAll',
      'updateSample',
      'updateTarget',
      'updateWip',
      'updateTDLowBound',
      'updateTDHighBound'
    ])
  }
}
</script>
