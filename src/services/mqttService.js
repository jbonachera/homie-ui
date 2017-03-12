import mqtt from 'mqtt'
import Store from '../store/store'

var prefix = Store.getters.homie_prefix
const client = mqtt.connect(Store.getters.mqtt_server, {
  'clean': true
})

client.on('offline', () => {
  Store.commit('SET_MQTT_OFFLINE')
  Store.commit('RESET_STATE')
})
client.on('reconnect', () => {
  Store.commit('SET_MQTT_OFFLINE')
  Store.commit('RESET_STATE')
})
client.on('close', () => {
  Store.commit('SET_MQTT_OFFLINE')
  Store.commit('RESET_STATE')
})
client.on('error', () => {
  Store.commit('SET_MQTT_OFFLINE')
  Store.commit('RESET_STATE')
})

client.on('connect', () => {
  Store.commit('SET_MQTT_ONLINE')
  client.subscribe(prefix + '+/$homie', {'qos': 1})
})
client.on('message', (topic, message, packet) => {
  Store.commit('INC_COUNT')
  var parts = topic.split('/')
  this.prefix = parts.shift()
  var id = parts.shift()
  var path = parts.join('/')

  if (!(id in Store.state.devices)) {
    Store.commit('ADD_DEVICE', id)
  }
  var components = path.replace('$', '').split('/')
  switch (components.length) {
    case 1:
      switch (components[0]) {
        case 'homie':
          Store.commit('SET_DEVICE_PROP', [id, 'homie', message.toString()])
          client.subscribe(prefix + id + '/$online', {'qos': 1})
          client.subscribe(prefix + id + '/$name', {'qos': 1})
          client.subscribe(prefix + id + '/$mac', {'qos': 1})
          client.subscribe(prefix + id + '/$localip', {'qos': 1})
          client.subscribe(prefix + id + '/+/$type', {'qos': 1})
          client.subscribe(prefix + id + '/$implementation', {'qos': 1})
          client.subscribe(prefix + id + '/$implementation/+', {'qos': 1})
          client.subscribe(prefix + id + '/$implementation/ota/status', {'qos': 1})
          client.subscribe(prefix + id + '/$stats/+', {'qos': 1})
          client.subscribe(prefix + id + '/$fw/+', {'qos': 1})
          break
        case 'implementation':
          Store.commit('SET_DEVICE_SUBPROP', [id, 'implementation', 'name', message.toString()])
          break
        default:
          Store.commit('SET_DEVICE_PROP', [id, components[0], message.toString()])
      }
      break
    default:
      var node = components[0]
      var item = components[1]
      switch (item) {
        case 'type':
          Store.commit('ADD_DEVICE_NODE', [id, node])
          Store.commit('SET_DEVICE_SUBPROP', [id, node, 'type', message.toString()])
          client.subscribe(prefix + id + '/' + node + '/$properties', {'qos': 1})
          break
        case 'properties':
          var properties = message.toString().split(',')
          Store.commit('SET_DEVICE_SUBPROP', [id, node, 'properties', properties])
          properties.forEach((item) => {
            client.subscribe(prefix + id + '/' + node + '/' + item.replace(':settable', ''), {'qos': 1})
          })
          break
        case 'ota':
          switch (components[2]) {
            case 'status':
              Store.commit('SET_DEVICE_SUBPROP', [id, node, 'ota_status', message.toString()])
              break
          }
          break
        default:
          Store.commit('SET_DEVICE_SUBPROP', [id, node, item, message.toString()])
      }
  }
})

function install (Vue, options) {
  Object.defineProperties(Vue.prototype, {
    $mqtt: {
      get () {
        return client
      }
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
export { install }
