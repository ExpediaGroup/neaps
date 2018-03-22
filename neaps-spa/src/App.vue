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

<style src="./styles/global.scss" lang="scss">
</style>

<template>
<div class="container">
  <Inserter></Inserter>
  <Tickets></Tickets>
</div>
</template>

<script>
import Inserter from './components/Inserter.vue'
import Tickets from './components/Tickets.vue'
// import Leg from './components/Leg.vue'
import store from './vuex/store'

export default {
  components: {
    Inserter,
    Tickets
    // Leg
  },
  store
}
</script>
