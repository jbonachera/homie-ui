import Vue from 'vue'
import Router from 'vue-router'
import Devices from '@/components/Devices'
import Config from '@/components/Config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Devices',
      component: Devices
    },
    {
      path: '/config',
      name: 'Config',
      component: Config
    }
  ]
})
