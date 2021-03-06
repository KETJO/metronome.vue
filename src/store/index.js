import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: true,
    sizesRange: [2, 4, 8, 16],
    themeDark: true,
    
    currentSong: {
      title:"free mode",
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
    isPlay: state=>state.isPlay,
    currentSong: state=>state.currentSong,
    songs: state=>state.songs,

    sizesRange:state=>state.sizesRange,

    menu: state=>state.menu,
    themeDark: state=>state.themeDark
  },
  mutations: {
    CHANGE_THEME(state){
      state.themeDark = !state.themeDark;
      const html = document.documentElement;
      if(!html.dataset.theme) html.setAttribute('data-theme', 'light')
      else html.removeAttribute('data-theme')
    },
    CHANGE_CURRENT_VALS(state, newVals){
      state.currentSong=({...state.currentSong, ...newVals})
    }
  },
  actions: {

  },
  modules: {

  }
})
