<template>
  <div class="nodeContainer">
  <h4><b>{{ node.name }}</b> (type: {{ node.type }})</h4>
  <ul>
    <li v-for="property in node.properties" v-if="property !== 'unit'"><span>{{ property.replace(':settable', '') }}:</span>
      <span>{{ node[property.replace(':settable', '')] }}</span>
      <span v-if="property.endsWith(':settable')"> <input v-model="settables[property]" type="text"/><button class="btn btn-primary btn-xs" v-on:click="send(property)">Set</button></span>
    </li>
    <li>unit: {{ units[node['unit']] }}</li>
  </ul>

  </div>
</template>

<script>
export default {
  name: 'DeviceNode',
  data () {
    return {
      units: {
        'c': '°C',
        '%': '%',
        'bool': 'boolean',
        'md5': 'MD5 Checksum'
      },
      settables: {}
    }
  },
  methods: {
    send (property) {
      const payload = this.settables[property]
      const propertyName = property.split(':')[0]
      console.log(propertyName + ' -> ' + payload)
      this.$mqtt.publish('devices/' + this.device.id + '/' + this.node.name + '/' + propertyName + '/set', payload)
    }
  },
  props: ['node', 'device']
}

</script>
