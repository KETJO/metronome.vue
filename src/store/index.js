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
        version: '1.1',
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
    //const
    sizesRange:state=>state.metronomeData.constData.sizesRange,
    allSounds: state=>state.metronomeData.constData.allSounds,
    //info
    version: state=>state.metronomeData.info.version,
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
			state.metronomeData = {...data.metronomeData}
		},

    SET_USER_NAME(state,user){
      state.metronomeData.info.user=user
    },
    SET_ERROR(state, error){
      console.log('error');
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
    updateTheme(){
      const html = document.documentElement;
      if(!html.dataset.theme) html.setAttribute('data-theme', 'light')
      else html.removeAttribute('data-theme')
    },
    async reg({dispatch, commit},{name, email, password}){
			try{
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')
				
				// await firebase.database().ref(`/users/${uid}/metronomeData`).set({user: name})

				commit('SET_USER_NAME', name)
			} catch(e){
				commit('SET_ERROR', e)
        console.log(e);
				throw e
			}
		},
    async login({dispatch, commit}, {email, password}){
			try{
				await firebase.auth().signInWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')

				await firebase.database().ref(`/users/${uid}/`).on('value', function(data){commit('SET_NEW_STATE', data.val())})
        
        dispatch('updateTheme')
			} catch(e){
				commit('SET_ERROR', e)
				throw e
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
				console.log('loged out');
			}catch(e){}
		},
    async totalSaveToFb({dispatch, rootState}){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/`).set({metronomeData: rootState.metronomeData})
		}
  },
})
