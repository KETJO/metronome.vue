import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sizesRange: [2, 4, 8, 16],
    allSounds: ["rim-shot", "hi-hat", "cowbell"],
    settedSound: 'rim-shot',
    themeDark: true,
    idCounter: 2,

    currentSong: {
      id: 0,
      title:"new song",
      bpm: 120,
      beats: "4",
      size: "4",
      sFirstBeat: true
    },

    songs: 
      [{
        id: 1,
        author: "Deftones",
        title: "Digital Bath",
        bpm: 90,
        beats: "4",
        size: "4",
        sFirstBeat: true
      },
      {
        id: 2,
        author: "Deftones",
        title: "Change",
        bpm: 100,
        beats: "4",
        size: "4",
        sFirstBeat: true
      }],

    freeModeSong:{
        id: 0,
        title:"new song",
        bpm: 120,
        beats: "4",
        size: "4",
        sFirstBeat: true
      }
  },
  getters: {
    currentSong: state=>state.currentSong,
    freeModeSong: state=>state.freeModeSong,
    songs: state=>state.songs,
    allSounds: state=>state.allSounds,
    settedSound: state=>state.settedSound,
    idCount: state=>state.idCounter,
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
    },
    CHANGE_CURRENT_BPM(state, newBpm){
      state.currentSong.bpm = newBpm;
    },
    CHANGE_SETTED_SOUND(state, value){
      state.settedSound = value;
    },
    INCREASE_ID(state){
      state.idCounter++;
    },
    ADD_SONG(state, song){
      state.songs.push(song)
    },
    UPDATE_SONG(state, song) {
      state.songs.forEach((s,i)=>{
        if(s.id==song.id) state.songs.splice(i,1,song)
      });
    },
    DELETE_SONG(state, song){
      state.songs.forEach((s,i)=>{
        if(s.id==song.id) state.songs.splice(i,1)
      })
    },
    LOAD_SONG(state, song){
      state.currentSong = song;
    },
    
  },
  actions: {

  },
  modules: {

  }
})
