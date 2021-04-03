/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    metronomeData: {
      constData: {
        sizesRange: [2, 4, 8, 16],
        allSounds: ["click", "rim-shot", "hi-hat"]
      },

      info: {
        user:'',
        infoMessage: ''
      },

      lastCurrSett: {
        themeDark: true,
        volume: '0',
        settedSound: 'click',
        lastSong: null
      },

      currentSong: {
        id: "0aaaaaaaa",
        author: "Unknown",
        title: "Exapmle",
        bpm: 120,
        beats: "4",
        size: "4",
        sFirstBeat: true
      },

      songs: 
        [{
          id: "1bbbbbbbb",
          author: "Nirvana",
          title: "Smels like teen spirit",
          bpm: 116,
          beats: "4",
          size: "4",
          sFirstBeat: true
        },
        {
          id: "0aaaaaaaa",
          author: "Pantera",
          title: "Walk",
          bpm: 120,
          beats: "4",
          size: "4",
          sFirstBeat: true
        },
        {
          id: "2cccccccc",
          author: "RadioHead",
          title: "Creep",
          bpm: 92,
          beats: "4",
          size: "4",
          sFirstBeat: true
        }],
    }
  },
  getters: {
    metronomeData: state=>state.metronomeData,
    //const
    sizesRange:state=>state.metronomeData.constData.sizesRange,
    allSounds: state=>state.metronomeData.constData.allSounds,
    //info
    user: state=>state.metronomeData.info.user,
    infoMessage: state=>state.metronomeData.info.infoMessage,
    //lastCurrSett
    themeDark: state=>state.metronomeData.lastCurrSett.themeDark,
    volume: state=>state.metronomeData.lastCurrSett.volume,
    settedSound: state=>state.metronomeData.lastCurrSett.settedSound,
    //other
    lastSong: state=>state.metronomeData.lastCurrSett.lastSong,
    currentSong: state=>state.metronomeData.currentSong,
    songs: state=>state.metronomeData.songs,
  },
  mutations: {
    SET_NEW_STATE(state, data){
      if(data) state.metronomeData = {...data.metronomeData}
		},
    RESET_STORE(state, data){
      state.metronomeData = {...state.metronomeData, ...data}
    },
    SET_USER_NAME(state,user){
      state.metronomeData.info.user=user
    },
    SET_INFO_MESSAGE(state, message){
      state.metronomeData.info.infoMessage = message;
    },
    CHANGE_THEME(state){
      state.metronomeData.lastCurrSett.themeDark = !state.metronomeData.lastCurrSett.themeDark;
    },
    UPDATE_THEME(state, isDark){
      const html = document.documentElement;
      if(state.metronomeData.lastCurrSett.themeDark) html.removeAttribute('data-theme')
      else html.setAttribute('data-theme', 'light')
    },
    CHANGE_VOL(state, vol){
      state.metronomeData.lastCurrSett.volume=vol
    },
    CHANGE_SETTED_SOUND(state, value){
      state.metronomeData.lastCurrSett.settedSound = value;
    },
    CHANGE_CURRENT_VALS(state, newVals){
      state.metronomeData.currentSong=({...state.metronomeData.currentSong, ...newVals})
    },
    CHANGE_CURRENT_BPM(state, newBpm){
      state.metronomeData.currentSong.bpm = newBpm;
    },
    ADD_SONG(state, song){
      state.metronomeData.songs.push(song)
    },
    UPDATE_SONG(state, song) {
      state.metronomeData.songs.forEach((s,i)=>{
        if(s.id==song.id) state.metronomeData.songs.splice(i,1,song)
      });
    },
    SAVE_LAST_SONG(state, song){
      state.metronomeData.lastCurrSett.lastSong=song;
    },
    DELETE_SONG(state, song){
      state.metronomeData.songs.forEach((s,i)=>{
        if(s.id==song.id) state.metronomeData.songs.splice(i,1)
      })
    },
    LOAD_SONG(state, song){
      state.metronomeData.currentSong = song;
    },
  },
  actions: {
    async accessAllowed({dispatch, commit}, message) {
      //show message 
      commit('SET_INFO_MESSAGE', message);
      //localSave
      const uid = await dispatch('getUid');
			localStorage.setItem("uid", JSON.stringify(uid));
      //go to
			router.push({
				name: "Main",
			});
		},
    async getUid(){
      const user = firebase.auth().currentUser
			return user ? user.uid : null
    },
    async updateStateFromFb({commit}){
      const localUid = JSON.parse(localStorage.getItem("uid"));
      if(localUid) {
        await firebase.database().ref(`/users/${localUid}/`).on('value', snap=>{
          commit('SET_NEW_STATE', snap.val());
        })
      }
    },
    async saveToFb({dispatch, rootState}){
      try{
        const uid = await dispatch('getUid');
        let oldData;
        await firebase.database().ref(`/users/${uid}/`).on('value', snap=>{
          oldData = snap.val().metronomeData;
        })
        const currentData = rootState.metronomeData;
        let metronomeData;
        if(oldData) metronomeData = {...oldData, ...currentData};
        else metronomeData = currentData;
        await firebase.database().ref(`/users/${uid}/`).set({metronomeData});
      }catch(e){  
        console.log('firebase save error', e);
      }
		},
    async logout(){
			try{
				await firebase.auth().signOut()
        localStorage.removeItem("uid")
			}catch(e){
        console.log('logout error', e);
      }
		},
  },
})
