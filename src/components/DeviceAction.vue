<template>
  <div class="col-md-12">
  <div class="col-md-6">
  <DeviceReset v-bind:device="device"></DeviceReset>
  </div>
  <div class="col-md-6">
  <DeviceOTA v-bind:firmwareProviders="firmwareProviders" v-bind:device="device"></DeviceOTA>
  </div>
  </div>
</template>

<script>
import DeviceReset from './DeviceReset.vue'
import DeviceOTA from './DeviceOTA.vue'

export default {
  name: 'DeviceAction',
  data () {
    return {}
  },
  components: {
    'DeviceReset': DeviceReset,
    'DeviceOTA': DeviceOTA
  },
  props: ['device', 'firmwareProviders']
}

</script>

<style scopped>
button {
  margin: 2px;
}
</style>
