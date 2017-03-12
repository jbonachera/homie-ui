<template>
  <div class="row">
    <h2>{{device.name}} ({{device.id}})</h2>
    <div class="col-md-12">
    <div class="col-md-3">
      <h3> System stats </h3>
      <ul>
      <li>Signal: {{device.stats.signal}}% <DeviceSignal v-bind:signal="Math.round(device.stats.signal / 20)"></DeviceSignal></li>
      <li>Uptime: {{device.stats.uptime}}s</li>
      <li>Stats interval: {{ device.stats.interval }}s</li>
      </ul>
    </div>
    <div class="col-md-9">
      <h3> Nodes </h3>
      <div class="col-md-6" v-for="node in this.getNodes(device)">
        <DeviceNode v-bind:device="device" v-bind:node="node"></DeviceNode>
      </div>
    </div>
    </div>
    <hr />
    <h3> Administration </h3>
    <div class="row">
      <div class="col-md-12">
       <DeviceAction v-bind:firmwareProviders="firmwareProviders" v-bind:device="device"></DeviceAction>
      </div>
    </div>
    <!-- RAW INFORMATIONS
    <div class="row">
      <h3> Raw Informations </h3>
      <pre>{{ device }}</pre>
    </div>$
    -->
  </div>
</template>

<script>
import DeviceAction from './DeviceAction.vue'
import DeviceSignal from './DeviceSignal.vue'
import DeviceNode from './DeviceNode.vue'
export default {
  name: 'DeviceInfo',
  components: {
    'DeviceNode': DeviceNode,
    'DeviceAction': DeviceAction,
    'DeviceSignal': DeviceSignal
  },
  data () {
    return {}
  },
  props: ['device', 'firmwareProviders'],
  methods: {
    getNodes: (device) => {
      var nodes = []
      for (var item in device) {
        if (device[item]['type']) {
          var newNode = device[item]
          newNode['name'] = item
          nodes.push(newNode)
        }
      }
      return nodes
    }
  }
}

</script>
