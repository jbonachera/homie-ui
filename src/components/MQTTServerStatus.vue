<template>
  <div class="devices row center-block">
    <div class="col-md-12">
      <span v-if="mqtt_status === 'ONLINE'">Connected to: {{ server }}</span>
      <span v-else>Disconnected from: {{ server }}</span>
    </div>
    <p> <img height="20" width="20" src="http://cultofthepartyparrot.com/parrots/hd/parrot.gif"/> received {{ count }} mqtt messages </p>
   </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'MQTTServerStatus',
    computed: {
      ...mapGetters([
        'mqtt_server',
        'mqtt_status',
        'count'
      ]),
      server () {
        const server = this.mqtt_server
        if (server.indexOf('@') > 0) {
          const scheme = server.split('://')[0]
          const leftovers = server.split('@')[1]
          return `${scheme}://[user]:[password]@${leftovers}`
        }
      }
    }
  }
</script>
