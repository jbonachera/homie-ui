<template>
  <div v-date="uptime"> </div>
</template>

<script>
import * as moment from 'moment'
import 'moment-duration-format'
export default {
  name: 'DeviceUptime',
  data () {
    return {}
  },
  props: ['uptime'],
  directives: {
    date: (el, binding) => {
      el.innerText = moment.duration(binding.value, 'seconds').format('d [days], h [hrs], m [min]')
    }
  }
}

</script>
