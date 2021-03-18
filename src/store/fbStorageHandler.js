/* eslint-disable */
import firebase from 'firebase/app'
export default {
	actions: {
		async saveSongsToFb({dispatch,rootState}){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/state/`).set({songs:rootState.songs})
		},
		async totalSaveToFb({dispatch, rootState}){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/state/`).set({state:rootState})
		}
	},
	mutations: {
		SET_STATE(state, data){
			state = data.state
		}
	}
}