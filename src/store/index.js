/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    metronomeData: {
      constData: {
        sizesRange: [2, 4, 8, 16],
        allSounds: ["rim-shot", "hi-hat", "rim-shot2", "hi-hat2"],
      },

      defaultSong:{
        author: "Unknown",
        id: "0aaaaaaaa",
        title:"new song",
        bpm: 120,
        beats: "4",
        size: "4",
        sFirstBeat: true
      },

      info: {
        user:'',
        error: null,
      },

      lastCurrSett: {
        themeDark: true,
        volume: 80,
        settedSound: 'rim-shot',
      },

      currentSong: {
        author: "Unknown",
        id: "0aaaaaaaa",
        title:"new song",
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
    error: state=>state.metronomeData.info.error,
    //lastCurrSett
    themeDark: state=>state.metronomeData.lastCurrSett.themeDark,
    volume: state=>state.metronomeData.lastCurrSett.volume,
    settedSound: state=>state.metronomeData.lastCurrSett.settedSound,
    //other
    defaultSong: state=>state.metronomeData.defaultSong,
    currentSong: state=>state.metronomeData.currentSong,
    songs: state=>state.metronomeData.songs,
  },
  mutations: {
    SET_NEW_STATE(state, data){
      if(data) state.metronomeData = {...data.metronomeData}
		},
    UPDATE_STATE_FROM_LOCAL(state){
      const locData = JSON.parse(localStorage.getItem('tempData'));
      if(locData) state.metronomeData = locData;
    },
    RESET_STORE(state, data){
      state.metronomeData = {...state.metronomeData, ...data}
    },
    SET_USER_NAME(state,user){
      state.metronomeData.info.user=user
    },
    SET_ERROR(state, error){
      state.metronomeData.info.error = error
    },
    CHANGE_THEME(state){
      state.metronomeData.lastCurrSett.themeDark = !state.metronomeData.lastCurrSett.themeDark;
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
    saveToLocSto({getters}){
      const data = JSON.stringify(getters.metronomeData);
      localStorage.setItem('tempData', data);
    },
    updateTheme({rootState}){
      const html = document.documentElement;
      if(rootState.metronomeData.lastCurrSett.themeDark) html.removeAttribute('data-theme')
      else html.setAttribute('data-theme', 'light')
    },

    async reg({commit},{name, email, password}){
			try{
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				commit('SET_USER_NAME', name)
        dispatch('saveToLocSto')
			} catch(e){
				commit('SET_ERROR', e)
        console.log(e);
				throw e
			}
		},

    async login({dispatch, commit}, {email, password}){
			try{
				await firebase.auth().signInWithEmailAndPassword(email, password)
        await firebase.database().ref(`/users/${uid}/`).on('value', function(data){commit('SET_NEW_STATE', data.val())})
        dispatch('saveToLocSto')
			} catch(e){
				commit('SET_ERROR', e)
				throw e
			}
		},
		async loginGoogle({dispatch, commit}){
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        commit('SET_USER_NAME', result.user.displayName);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/`).on('value', function(data){commit('SET_NEW_STATE', data.val())})
        dispatch('updateTheme');
        dispatch('saveToLocSto')
      } catch(e){
        console.log(e);
      }
    },
    async loginFacebook({dispatch, commit}){
      try{
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
				const result = await firebase.auth().signInWithPopup(facebookProvider)
        commit('SET_USER_NAME', result.user.displayName);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/`).on('value', function(data){commit('SET_NEW_STATE', data.val())})
        dispatch('updateTheme');
        dispatch('saveToLocSto')
      }catch(e){
        console.log(e);
      }
    },
		getUid(){
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
		async logout({dispatch}){
			try{
				await dispatch('totalSaveToFb');
				await firebase.auth().signOut()
        localStorage.removeItem('tempData')
			}catch(e){}
		},
    async totalSaveToFb({dispatch, rootState}){
			const uid = await dispatch('getUid')
      console.log('ttstofb');
			await firebase.database().ref(`/users/${uid}/`).set({metronomeData: rootState.metronomeData})
		}
  },
})
