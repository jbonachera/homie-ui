<template>
<div v-if="device.implementation.name==='esp8266'">
<h3> Upgrade device </h3>
  <p>
  Device will do an Over-the-air (OTA) upgrade.<br/>
  The device will reboot after a successful application of the upgrade.<br/>
  If the device does not reboot, you will have to reboot it manualy.<br/>
  </br>
  You have to choose a firmware version to start an OTA.
  </p>
  <div>
  <select v-model="selectedFirmware" class="form-control">
     <option v-for="option in Object.keys(firmwares)">
    {{ option }}
    </option>
    </select>
   <select v-model="selectedVersion" class="form-control" v-if="selectedFirmware in firmwares">
     <option v-for="option in firmwares[selectedFirmware].versions">
    {{ option }}
    </option>
    </select>
    <button v-on:click="startOTA" class="btn btn-default">Start OTA</button>
  </div>
  <div>
  <h4> Progress </h4>
  <p>
  {{ OTAStatus }}
  </p>
  <progressbar v-bind:now="progress" label v-bind:type="state"></progressbar>
  </div>
</div>
</template>

<script>
import { progressbar } from 'vue-strap'
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceOTA',
  components: {
    progressbar
  },
  data () {
    return {
      selectedVersion: '',
      selectedFirmware: '',
      progress: 0,
      state: 'primary',
      handlerSetup: false
    }
  },
  computed: {
    ...mapGetters([
      'firmwares',
      'devices',
      'homie_prefix'
    ]),
    OTAStatus () {
      const devices = this.devices
      if (this.device.id && devices[this.device.id] && devices[this.device.id].implementation.ota_status) {
        const current = this.parseStatus(devices[this.device.id].implementation.ota_status)
        this.progress = current['progress']
        this.state = current['state']
        return current['status']
      } else {
        return 'Please select a firmware and version to engage OTA.'
      }
    }
  },
  props: ['device'],
  methods: {
    parseStatus (status) {
      var firmwares = this.firmwares
      var [code, progress] = ['', '']
      var statusParts = status.split(' ')
      code = statusParts[0]
      if (statusParts.length >= 2) {
        progress = statusParts[1]
      }
      var info = {status: '', progress: 0, state: 'primary'}
      switch (code) {
        case '304':
          info.progress = 0
          info.status = 'Device is already up-to-date.'
          info.state = 'success'
          break
        case '202':
          info.progress = 0
          info.status = 'Device accepted to start OTA.'
          var target = this.homie_prefix + firmwares[this.selectedFirmware].id + '/$implementation/firmware/' + this.selectedFirmware + '/' + this.selectedVersion + '/upgrade'
          this.$mqtt.publish(target, this.device.id)
          break
        case '206':
          info.status = 'Device is receiving firmware.'
          var [current, total] = progress.split('/')
          var percent = Math.round(parseInt(current) / parseInt(total) * 100)
          info.progress = percent
          break
        case '200':
          if (this.progress > 0) {
            info.status = 'OTA successful. Device will now reboot.'
            info.state = 'success'
          }
          break
        case '403':
          info.status = 'OTA is disabled on device.'
          info.state = 'danger'
          break
      }
      return info
    },
    startOTA () {
      var firmwares = this.firmwares
      this.status = 'OTA started - Waiting for device to answer.'
      this.$mqtt.publish(this.homie_prefix + this.device.id + '/$implementation/ota/checksum', firmwares[this.selectedFirmware][this.selectedVersion])
    }
  }
}
</script>
