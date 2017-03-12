<template>
  <p>
  {{ fw.name }} <span v-if="isUpToDate(fw)" class="label label-success">{{ fw.version }}</span>
  <span v-else class="label label-warning">{{ fw.version }}</span>
  </p>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceFirmware',
  data () {
    return {}
  },
  props: ['fw'],
  computed: {
    ...mapGetters([
      'firmwares'
    ])
  },
  methods: {
    isUpToDate (fw) {
      const firmwares = this.$store.getters.firmwares
      if (firmwares[fw.name]) {
        const latest = firmwares[fw.name].latest
        return fw.version === latest
      } else {
        return true
      }
    }
  }
}

</script>

<style scopped>
button {
  margin: 2px;
}
</style>
