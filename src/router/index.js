import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "../views/Main.vue"
import BeatsMenu from '../views/BeatsMenu'
import Songs from '../views/Songs'
import AddSong from '../views/AddSong.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/addSong',
    name: 'AddSong',
    component: AddSong
  },
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/beatsMenu',
    name: 'BeatsMenu',
    component: BeatsMenu
  },
  {
    path: '/songs',
    name: 'Songs',
    component: Songs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
