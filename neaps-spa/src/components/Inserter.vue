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
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
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
        <transition-group name="fade" tag="div">
          <div class="row" v-bind:id="'leg'+index" v-bind:key="leg" v-for="(leg, index) in getLegs">
              <div class="one column name">
                {{ index + 1 }}
              </div>
              <Leg @changeValidation="updateValidation" v-bind:leg="leg" v-bind:index="index"></Leg>
              <div class="one column remove">
                <a href="#" class="icon-minus-circled" @click.prevent="removeLeg(index)" v-show="singleLeg"></a>
              </div>
          </div>
        </transition-group>
        <a id="addLeg" class="add icon-plus-squared" href="#" @click.prevent="wrapAddLeg"> Add Group</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Leg from './Leg.vue'

export default {
  components: {
    Leg
  },
  mounted: function () {
    this.wrapAddLeg()
  },
  computed: {
    singleLeg: function () {
      if (this.getLegs.length === 1) {
        return false
      } else {
        return true
      }
    },
    ...mapGetters([
      'isFirstRun',
      'getType',
      'getLegs'
    ])
  },
  data: function () {
    return {
      insValidated: []
    }
  },
  methods: {
    wrapAddLeg: function () {
      console.log('')
      this.addLeg()
      this.insValidated.push(false)
      this.setValidated(false)
    },
    updateValidation: function (i, value) {
      console.log('I am validating')
      console.log(i)
      console.log(value)
      this.insValidated[i] = value
      console.log(this.insValidated)

      let check = true
      for (let value of this.insValidated) {
        check = check && value
      }

      if (check) {
        this.setValidated(true)
      } else {
        this.setValidated(false)
      }
    },
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
    ...mapActions([
      'disableFirsrRun',
      'setValidated',
      'setType',
      'addLeg',
      'removeLeg'
    ])
  }
}
</script>
