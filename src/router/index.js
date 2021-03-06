import Vue from 'vue'
import VueRouter from 'vue-router'

import BeatsMenu from '../components/BeatsMenu'
Vue.use(VueRouter)

const routes = [
  {
    path: '/beatsMenu',
    name: 'BeatsMenu',
    component: BeatsMenu
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
