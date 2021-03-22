/* eslint-disable */
import firebase from 'firebase/app'
export default {
	actions: {
		async totalSaveToFb({dispatch, rootState}){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/`).set({state:rootState})
		}
	},
	mutations: {
		SET_STATE(state, data){
			state = {...state, ...data.state}
		}
	}
}