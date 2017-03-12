<template>
  <div class="devices row center-block">
    <div class="col-md-12">
    <h1>Device list</h1>
    <p> Homie prefix: {{ homie_prefix }} </p>
    <div class="row">
    <div class="col-md-12">
    <div class="table-responsive">
    <table class="table table-hover">
      <tr>
      <th v-for="column in columns">
      {{column}}
      </th>
      </tr>
      <tbody>
        <tr v-for="(device,index) in devices">
        <td><DeviceSignal v-bind:signal="Math.round(device.stats.signal / 20)"></DeviceSignal></td>
        <td><DeviceOnline v-bind:online="device.online"></DeviceOnline></td>
        <td>{{device.id}}</td>
        <td>{{device.name}}</td>
        <td>{{device.localip}}</td>
        <td><DeviceUptime v-bind:uptime="parseInt(device.stats.uptime)"></DeviceUptime></td>
        <td><DeviceFirmware v-bind:fw="device.fw"></DeviceFirmware></td>
        <td>
          <span class="glyphicon glyphicon-info-sign" aria-hidden="true" @click="selectedDevice=device"></span>
          <span class="glyphicon glyphicon-repeat" aria-hidden="true" @click="reboot(device)"></span>
          <span class="glyphicon glyphicon-edit" aria-hidden="true" @click="edit(device)"></span>
        </td>

        </tr>
      </tbody>
    </table>
    </div>
  <div class="row deviceDump" v-if="selectedDevice.homie">
    <DeviceInfo v-bind:firmwareProviders="firmwareProviders" v-bind:device="selectedDevice"></DeviceInfo>
  </div>
      <MQTTServerStatus></MQTTServerStatus>
      <button class="btn btn-primary" v-on:click="config">Configuration</button>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import DeviceOnline from './DeviceOnline.vue'
import DeviceUptime from './DeviceUptime.vue'
import DeviceSignal from './DeviceSignal.vue'
import DeviceFirmware from './DeviceFirmware.vue'
import DeviceAction from './DeviceAction.vue'
import DeviceInfo from './DeviceInfo.vue'
import MQTTServerStatus from './MQTTServerStatus.vue'
import { modal } from 'vue-strap'
import { mapGetters } from 'vuex'

export default {
  components: {
    'modal': modal,
    'DeviceUptime': DeviceUptime,
    'DeviceSignal': DeviceSignal,
    'DeviceFirmware': DeviceFirmware,
    'DeviceAction': DeviceAction,
    'DeviceInfo': DeviceInfo,
    'DeviceOnline': DeviceOnline,
    'MQTTServerStatus': MQTTServerStatus
  },
  computed: {
    ...mapGetters([
      'devices',
      'count',
      'homie_prefix'
    ])
  },
  methods: {
    config () {
      this.$router.push('/config')
    },
    edit (device) {
      // TODO: implement a tool to edit and push configuration
      let config = device.implementation.config
      console.log(config)
    },
    reboot (device) {
      const path = 'devices/' + device.id + '/$implementation/config/set'
      this.$mqtt.publish(path, '{}')
    }
  },
  name: 'devices',
  data () {
    return {
      columns: ['Signal', 'State', 'ID', 'Name', 'IP address', 'Uptime', 'Firmware', 'More'],
      firmwareProviders: {},
      messages: 0,
      selectedDevice: {}
    }
  },
  created () {}
}
</script>
<style scoped>
.deviceDump {
  text-align: left;
}
th {
    text-align: center;
    margin: 10px;
}
</style>
