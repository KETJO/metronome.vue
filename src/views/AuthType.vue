<template lang="pug">
.authType 
	.page__title 
		h2 login with
	.authType__content 
		#email.pointer(@click="$router.push('/emailAuth')") 
			img(src="../assets/img/email.png") 
			span.textGlow Email
		#loginGoogle.pointer(@click="googleAuth()")
			img(src="../assets/img/google.png")
			span.textGlow Google
		#loginFacebook.pointer(@click="facebookAuth()")
			img(src="../assets/img/facebook.png")
			span.textGlow Facebook
		#noAuthorize.pointer(@click="offline()")
			img(src="../assets/img/offline.png")
			span.textGlow Offline
</template>

<script>
import firebase from "firebase/app";
import { mapMutations, mapActions } from "vuex";
/* eslint-disable */
export default {
	computed: {},
	methods: {
		...mapActions(["getData", "accessAllowed"]),
		...mapMutations([
			"SET_USER_NAME",
			"SET_NEW_STATE",
			"SET_INFO_MESSAGE",
			"LOAD_SONG"
		]),

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
		},
		offline() {
			this.$router.push({ path: "/" });
		}
	}
};
</script>

<style lang="sass" scoped>
.authType
	display: flex
	align-items: center
	justify-content: center
	flex-direction: column
.authType__content
	width: 80%
	margin-top: 4rem
	display: flex
	flex-direction: column
	justify-items: center
	align-items: center
	margin-bottom: 2rem
.page__title
	width: 100%
	text-align: right
	color: var(--akcentLight)
#loginGoogle, #loginFacebook, #email, #noAuthorize
	width: 100%
	display: grid
	grid-template-columns: 1fr 3fr
	justify-content: center
	align-items: center
	margin: 1rem 0rem
	border-radius: 5px
	border: solid 2px var(--akcentLight)
	padding: 1rem 0rem
	img
		width: 4rem
		height: 4rem
		justify-self: end
	span
		font-size: 1.5rem
		color: var(--akcentLight)
		font-weight: 800
		margin-left: 1rem
		text-align: center
		letter-spacing: .1rem
</style>