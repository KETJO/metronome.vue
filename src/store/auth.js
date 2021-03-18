/* eslint-disable */
import firebase from 'firebase/app'
export default {
	actions: {
		async login({dispatch, commit}, {email, password}){
			try{
				await firebase.auth().signInWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')

				await firebase.database().ref(`/users/${uid}/`).on('value', function(data){commit('SET_STATE', data.val())})

				await firebase.database().ref(`/users/${uid}/info`).on('value', function(data){commit('SET_USER_NAME', data.val().name)})
			} catch(e){
				commit('SET_ERROR', e)
				throw e
			}
		},
		async reg({dispatch, commit},{name, email, password}){
			try{
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')
				
				await firebase.database().ref(`/users/${uid}/info`).set({name})

				await firebase.database().ref(`/users/${uid}/info`).on('value', function(data){commit('SET_USER_NAME', data.val().name)})
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
			await dispatch('totalSaveToFb');
			await firebase.auth().signOut()

		}
	}
}