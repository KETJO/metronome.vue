import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: true,
    currentSong: {
      bpm: 120,
      beats: "4",
      size: "4",
      sFirstBeat: true
    },
    songs:{
      digitalbath: {
        title: "Digital Bath",
        bpm: 90,
        beats: "4",
        size: "4",
        sFirstBeat: true
      },
      change: {
        title: "change",
        bpm: 100,
        beats: "4",
        size: "4",
        sFirstBeat: true
      },
    }
  },
  getters: {
    currentSong: state=>state.currentSong,
    songs: state=>state.songs
  },
  mutations: {

  },
  actions: {

  },
  modules: {

  }
})
