<template>
  <span class="barContainer">
    <div v-for="n in signal" :class="['bar'+n.toString(), colors[signal], 'bar']"></div>
  </span>
</template>

<script>
export default {
  name: 'DeviceSignal',
  data () {
    return {
      colors: {
        1: 'red',
        2: 'red',
        3: 'orange',
        4: 'green',
        5: 'green'
      }
    }
  },
  props: ['signal']
}

</script>

<style scoped>
.red {
  background-color: #FF5722;
  border: thin solid darken(#e74c3c, 20%);
}
.orange {
  background-color: #f1c40f;
  border: thin solid darken(#f1c40f, 7%);

}
.green {
  background-color: #8BC34A;
  border: thin solid darken(#16a085, 7%);
}

.bar1 {
  height:5px;
}
.bar2 {
  height:10px;
}
.bar3 {
  height:15px;
}
.bar4 {
  height:20px;
}
.bar5 {
  height:25px;
}
.bar {
  display: inline-block;
  width:6px;
  margin-left: 0.5px;
  margin-right: 0.5px;
}

</style>
