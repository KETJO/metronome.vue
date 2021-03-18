import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from "../views/Auth"
import Reg from "../views/Reg"
import Main from "../views/Main"
import BeatsMenu from '../views/BeatsMenu'
import Songs from '../views/Songs'
import AddSong from '../views/AddSong'
import EditSong from "../views/EditSong"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
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
  },
  {
    path: '/addSong',
    name: 'AddSong',
    component: AddSong
  },
  {
    path: '/editSong/:title',
    name: 'EditSong',
    component: EditSong
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
