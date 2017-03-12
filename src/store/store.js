import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  devices: {},
  count: 0,
  firmwares: {},
  mqtt_server: JSON.parse(window.localStorage.getItem('mqtt_server')),
  mqtt_status: '',
  homie_prefix: JSON.parse(window.localStorage.getItem('homie_prefix'))
}
var mutations = {
  RESET_STATE (state) {
    state.devices = {}
    state.count = 0
    state.firmwares = {}
  },
  SET_MQTT_OFFLINE (state) {
    state.mqtt_status = 'OFFLINE'
  },
  SET_MQTT_ONLINE (state) {
    state.mqtt_status = 'ONLINE'
  },
  SET_MQTT_SERVER (state, server) {
    state.mqtt_server = server
    window.localStorage.setItem('mqtt_server', JSON.stringify(server))
  },
  SET_HOMIE_PREFIX (state, prefix) {
    state.homie_prefix = prefix
    window.localStorage.setItem('homie_prefix', JSON.stringify(prefix))
  },
  ADD_DEVICE (state, id) {
    Vue.set(state.devices, id, {'id': id, 'name': '', 'localip': '', 'stats': {'signal': 0, 'uptime': 0}, 'implementation': {'actions': ['reset', 'upgrade']}, 'fw': {'name': 'unknown', 'version': ''}, 'online': false})
  },
  SET_DEVICE_PROP (state, payload) {
    var [id, prop, value] = payload
    Vue.set(state.devices[id], prop, value)
  },
  SET_DEVICE_SUBPROP (state, payload) {
    var [id, type, prop, value] = payload
    Vue.set(state.devices[id][type], prop, value)
    if (state.devices[id][type].type === 'firmwareProvider') {
      if (!state.firmwares[type]) {
        Vue.set(state.firmwares, type, {'id': id})
      }
      if (state.devices[id][type].versions) {
        const versionList = state.devices[id][type].versions.split(',')
        Vue.set(state.firmwares[type], 'versions', versionList.sort())
        versionList.forEach(function (version) {
          if (!state.firmwares[type][version]) {
            state.firmwares[type][version] = state.devices[id][type][version]
          }
        })
      }
      if (state.devices[id][type].latest) {
        Vue.set(state.firmwares[type], 'latest', state.devices[id][type].latest)
      }
    }
  },
  ADD_DEVICE_NODE (state, payload) {
    var [id, node] = payload
    Vue.set(state.devices[id], node, {})
  },
  INC_COUNT (state) {
    state.count += 1
  }
}

var getters = {
  devices: state => {
    return state.devices
  },
  count: (state) => {
    return state.count
  },
  firmwares: (state) => {
    return state.firmwares
  },
  mqtt_server: (state) => {
    return state.mqtt_server
  },
  mqtt_status: (state) => {
    return state.mqtt_status
  },
  homie_prefix: (state) => {
    return state.homie_prefix
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
