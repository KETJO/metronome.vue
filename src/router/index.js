import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from "../views/Auth"
import Reg from "../views/Reg"
import Main from "../views/Main"
import Songs from '../views/Songs'
import AddSong from '../views/AddSong'
import EditSong from "../views/EditSong"
import About from "../views/About"
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
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
