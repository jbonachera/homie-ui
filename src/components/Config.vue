<template>
  <div class="devices row center-block">
  <div class="col-md-12">
    <label for="mqtt_server_url">MQTT URL</label>
    <input id="mqtt_server_url" v-model="mqtt_server"/><br />
    <label for="homie_prefix">Homie prefix</label>
    <input id="homie_prefix" v-model="homie_prefix"/><br />
    <button class="btn btn-success" v-on:click="save">Save</button>
    <button class="btn btn-primary" v-on:click="cancel">Cancel</button>
  </div>
  </div>
</template>
<script>
export default {
  name: 'config',
  data () {
    return {
      mqtt_server: this.$store.getters.mqtt_server,
      homie_prefix: this.$store.getters.homie_prefix
    }
  },
  methods: {
    save () {
      this.$store.commit('SET_MQTT_SERVER', this.mqtt_server)
      this.$store.commit('SET_HOMIE_PREFIX', this.homie_prefix)
      this.$router.push('/')
    },
    cancel () {
      this.$router.push('/')
    }
  }
}
</script>

