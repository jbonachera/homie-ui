<template>
<div>
<h3> Reset device </h3>
  <p>
  The device will be reset, and will boot in Configuration Mode.<br/>
  It will host a wireless network, and you will have to connect to it to configure the device.
  </p>
  <button v-if="device.online=='false'" type="button" class="btn btn-primary btn-sm" disabled>Reset</button>
  <button v-else-if="device.implementation.name=='esp8266'" type="button" class="btn btn-primary btn-sm" v-on:click="resetDevice(device.id)">Reset</button>
  <button v-else type="button" class="btn btn-primary btn-sm" disabled>Reset (unsupported)</button>
</div>
</template>

<script>

export default {
  name: 'DeviceReset',
  data () {
    return {}
  },
  props: ['device'],
  methods: {
    resetDevice: function (id) {
      const path = 'devices/' + id + '/$implementation/reset'
      this.$mqtt.publish(path, 'true')
    }
  }
}
</script>
