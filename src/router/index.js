import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthType from "../views/AuthType"
import Auth from "../views/Auth"
import Reg from "../views/Reg"
import Main from "../views/Main"
import Songs from '../views/Songs'
import AddSong from '../views/AddSong'
import EditSong from "../views/EditSong"
import About from "../views/About"
import Policy from "../views/Policy.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/authType',
    name: 'AuthType',
    component: AuthType
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/',
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
  {
    path: '/policy',
    name: 'Policy',
    component: Policy
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
