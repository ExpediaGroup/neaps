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
    background: #f3f3f3;
  }
  .overlay {
    opacity: 0.9;
  }
  .popupContainerSave {
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

    .nameInput {
      width: 285px;
    }

    .cancel {
      display: block;
      margin: 0 5px;
    }

    .disabled {
      cursor: default;
      border: #f3f3f3 1px solid;
      color: #f3f3f3;

      &:hover {
        cursor: default;
        border: #f3f3f3 1px solid;
        color: #f3f3f3;
      }
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
    <div id="saver" class="two columns">
      <a id="saveSample" class="save icon-floppy" href="#" @click.prevent="openPopup"> Save</a>

      <transition name="fade_overlay">
        <div v-if="showPopup" class="overlay" id="loaderPopup">
        </div>
      </transition>

      <transition name="fade_popup">
        <div v-if="showPopup" class="popupContainerSave">
          <h4>Insert a name for your sample:</h4>
          <div class="popupContent">
            <input @input="validateName($event)" placeholder="simple name" v-model="name" class="nameInput" type="text">
            <a class="button small" href="#" v-bind:class="{ 'disabled': !enableSave }" @click.prevent="saveSample(name)">Save</a>
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
      showPopup: false,
      enableSave: false,
      name: ''
    }
  },
  props: {
    sample: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isFirstRun',
      'getType'
    ])
  },
  methods: {
    validateName: function (event) {
      if (event.target.value.length > 0) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    saveSample: function (name) {
      store(name, this.sample)
      this.showPopup = false
    },
    openPopup: function () {
      this.name = ''
      this.showPopup = true
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
