import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import RoundSlider from 'vue-round-slider'
import firebase from 'firebase/app'
import Vuelidate from 'vuelidate'

import 'firebase/auth'
import 'firebase/database'
import './registerServiceWorker'

Vue.use(RoundSlider)
Vue.use(Vuelidate)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBwA5_urwfnrcQ_gxuzKqC0hF4jUB7Cfi0",
  authDomain: "metronome-6e1bd.firebaseapp.com",
  databaseURL: "https://metronome-6e1bd-default-rtdb.firebaseio.com",
  projectId: "metronome-6e1bd",
  storageBucket: "metronome-6e1bd.appspot.com",
  messagingSenderId: "976550974028",
  appId: "1:976550974028:web:d0e1b106a563b7ee6e9ae9",
  measurementId: "G-4ML26JDBG7"
})
new Vue({
  router,
  store,
  render: h => h(App)
  }).$mount('#app')

// let app;
// firebase.auth().onAuthStateChanged(()=>{
//   if(!app){
//     app=new Vue({
//       router,
//       store,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })





