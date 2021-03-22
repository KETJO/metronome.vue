import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'
import FbStorageHandler from './fbStorageHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    FbStorageHandler
  },
  state: {
    version: '1.1',
    user:'',
    error: null,

    volume: 80,
    sizesRange: [2, 4, 8, 16],
    allSounds: ["rim-shot", "hi-hat", "rim-shot2", "hi-hat2"],
    settedSound: 'rim-shot',
    themeDark: true,
    idCounter: 2,

    currentSong: {
      author: "Unknown",
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
        author: "Nirvana",
        title: "Smels like teen spirit",
        bpm: 116,
        beats: "4",
        size: "4",
        sFirstBeat: true
      },
      {
        id: 2,
        author: "RadioHead",
        title: "Creep",
        bpm: 92,
        beats: "4",
        size: "4",
        sFirstBeat: true
      }],

    freeModeSong:{
        author: "Unknown",
        id: 0,
        title:"new song",
        bpm: 120,
        beats: "4",
        size: "4",
        sFirstBeat: true
      }
  },
  getters: {
    error: state=>state.error,
    user: state=>state.user,
    volume: state=>state.volume,
    currentSong: state=>state.currentSong,
    freeModeSong: state=>state.freeModeSong,
    songs: state=>state.songs,
    allSounds: state=>state.allSounds,
    settedSound: state=>state.settedSound,
    idCount: state=>state.idCounter,
    sizesRange:state=>state.sizesRange,
    menu: state=>state.menu,
    themeDark: state=>state.themeDark,
    version: state=>state.version
  },
  mutations: {
    SET_USER_NAME(state,user){
      console.log('object');
      state.user=user
    },
    SET_ERROR(state, error){
      state.error = error
    },
    CHANGE_THEME(state){
      state.themeDark = !state.themeDark;
      const html = document.documentElement;
      if(!html.dataset.theme) html.setAttribute('data-theme', 'light')
      else html.removeAttribute('data-theme')
    },
    CHANGE_VOL(state, vol){
      state.volume=vol
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
})
