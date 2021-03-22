/* eslint-disable */
import firebase from 'firebase/app'
export default {
	actions: {
		async login({dispatch, commit}, {email, password}){
			try{
				await firebase.auth().signInWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')

				await firebase.database().ref(`/users/${uid}/`).on('value', function(data){commit('SET_STATE', data.val())})
				console.log('downladed');
			} catch(e){
				commit('SET_ERROR', e)
				console.log('UNLOaded');
				throw e
			}
		},
		async reg({dispatch, commit},{name, email, password}){
			try{
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')
				
				await firebase.database().ref(`/users/${uid}/state`).set({user: name})

				commit('SET_USER_NAME', name)
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
			}catch(e){
				
			}
		}
	}
}