<template lang="pug">
.authType 
	.authType__content 
		#email.modal-btn(@click="$router.push('/emailAuth')") 
			img(src="../assets/img/email.png") 
			span login with email
		#loginGoogle.modal-btn(@click="googleAuth()")
			img(src="../assets/img/google.png")
			span login with google
		#loginFacebook.modal-btn(@click="facebookAuth()")
			img(src="../assets/img/facebook.png")
			span login with facebook
		#noAuthorize.modal-btn(@click="$router.push({ path: '/' })")
			img(src="../assets/img/offline.png")
			span offline version
</template>

<script>
import firebase from "firebase/app";
import { mapMutations, mapActions } from "vuex";
/* eslint-disable */
export default {
	computed: {},
	methods: {
		...mapActions(["getData", "accessAllowed"]),
		...mapMutations(["SET_USER_NAME", "SET_NEW_STATE", "SET_INFO_MESSAGE"]),

		async logInWithProvider(provider) {
			const result = await firebase.auth().signInWithPopup(provider);
			this.SET_USER_NAME(result.user.displayName);
			const uid = await this.$store.dispatch("getUid");
			await firebase
				.database()
				.ref(`/users/${uid}/`)
				.on("value", snap => {
					const data = snap.val();
					this.SET_NEW_STATE(data);
				});
		},
		async googleAuth() {
			try {
				const provider = new firebase.auth.GoogleAuthProvider();
				await this.logInWithProvider(provider);
				this.accessAllowed("loged in with Google");
			} catch (e) {
				this.SET_INFO_MESSAGE(e.message);
				console.log("failed to access with Google", e.message);
			}
		},
		async facebookAuth() {
			try {
				const provider = new firebase.auth.FacebookAuthProvider();
				await this.logInWithProvider(provider);
				this.accessAllowed("loged in with Facebook");
			} catch (e) {
				this.SET_INFO_MESSAGE(e.message);
				console.log("failed to access with Facebook", e.message);
			}
		}
	}
};
</script>

<style lang="sass" scoped>
.authType__content
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
.page__title
	text-align: right
#loginGoogle, #loginFacebook, #email, #noAuthorize
	width: 100%
	display: grid
	grid-template-columns: 1fr 1fr
	justify-content: space-between
	align-items: center
	margin-bottom: 2rem
	padding: 0rem 8rem
	img
		width: 3rem
		height: 3rem
		justify-self: center
	span
		justify-self: start
		font-size: 1.3rem
		text-transform: uppercase
		font-weight: 800
		text-align: center
		color: var(--akcentLight)
#noAuthorize
	width: 100%
	color: var(--greenCustom)
	button
		width: 100%
		text-transform: uppercase
		font-size: 1.2rem
</style>