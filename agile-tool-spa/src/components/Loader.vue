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
  #loaderPopup {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top:0;
    left:0;
    background: #fff;
  }
  .overlay {
    opacity: 0.9;
  }
  .popupContainer {
    position: fixed;
    left: 50%;
    top: 5%;
    margin-left: -193px;
    background: #fff;
    padding: 5px;
    z-index: 1001;
    min-width: 385px;

    h4 {
      background: #f3f3f3;
      padding: 0 10px;
    }

    .popupContent {
      height: auto;
      overflow-y: scroll;
    }

    .loadLine {
      border-bottom: 1px solid #f3f3f3;
    }

    .key, .value, .button {
      display: block;
      margin: 0 5px;
      float: left;
      overflow-wrap: break-word;
    }
    .value {
      width: 180px;
    }
    .key {
      width: 85px;
    }
    .button {
      padding: 0 10px;
    }
    .cancel {
      display: block;
      margin: 0 5px;
    }
  }
  .fade_popup-enter-active, .fade_popup-leave-active {
    transition: opacity .3s;
    opacity: 1;
  }
  .fade_popup-enter, .fade_popup-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .fade_overlay-enter-active, .fade_overlay-leave-active {
    transition: opacity .3s;
    opacity: 0.9;
  }
  .fade_overlay-enter, .fade_overlay-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

<template>
    <div id="loader" class="two columns">
      <a id="loaderSample" class="load icon-download" href="#" @click.prevent="openPopup"> Load</a>

      <transition name="fade_overlay">
        <div v-if="showPopup" class="overlay" id="loaderPopup">
        </div>
      </transition>

      <transition name="fade_popup">
        <div v-if="showPopup" class="popupContainer">
          <h4>Select sample to load:</h4>
          <div class="popupContent">
            <p v-if="!storeEmpty">We are sorry you have no samples saved yet.</p>
            <div v-bind:key="load" v-for="(load, index) in loadables">
              <div class="row clearfix loadLine">
                <span class="key">{{ index }}</span>
                <span class="value">{{ load }}</span> 
                <a class="button small" href="#" @click.prevent="loadSample(index, load)">Load</a>
              </div>
            </div>
          </div>
          <a href="#" class="cancel" @click.prevent="showPopup = false">Cancel</a>
        </div>
      </transition>

    </div>
</template>

<script>
import store from 'store2'

import { mapGetters, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      loadables: {},
      showPopup: false,
      storeEmpty: false
    }
  },
  computed: {
    ...mapGetters([
      'isFirstRun',
      'getType'
    ])
  },
  methods: {
    loadSample: function (index, load) {
      this.$emit('sampleLoaded', load)
      this.showPopup = false
    },
    openPopup: function () {
      console.log('111111111111111111')
      const loads = store()
      if (Object.keys(loads).length === 0) {
        this.storeEmpty = false
        this.showPopup = true
      } else {
        this.loadables = loads
        this.storeEmpty = true
        this.showPopup = true
      }
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
