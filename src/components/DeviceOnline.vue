<template>
  <span class="label label-success" v-if="online === 'true'">Online</span>
  <span class="label label-danger" v-else>Offline</span>
</template>

<script>
export default {
  name: 'DeviceName',
  data () {
    return {}
  },
  props: ['online']
}

</script>
