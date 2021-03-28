<template lang="pug">
.authType 
	.authType__content 
		#email.modal-btn(@click="emailAuth()") 
			img(src="../assets/img/email.png") 
			span  login with email
		#loginGoogle.modal-btn(@click="googleAuth()")
			img(src="../assets/img/google.png")
			span  login with google
		#loginFacebook.modal-btn(@click="facebookAuth()")
			img(src="../assets/img/facebook.png")
			span  login with facebook
		#noAuthorize.modal-btn(@click="$router.push({ path: '/' })")
			img(src="../assets/img/offline.png")
			span offline version 
</template>

<script>
/* eslint-disable */
export default {
	methods: {
		emailAuth(){
			this.$router.push('/auth')
		},
		async googleAuth() {
			try {
				await this.$store.dispatch("loginGoogle");
				this.$router.push({
					name: "Main",
					params: { message: "loged in" }
				});
			} catch (e) {}
		},
		async facebookAuth() {
			try {
				await this.$store.dispatch("loginFacebook");
				this.$router.push({
					name: "Main",
					params: { message: "loged in" }
				});
			} catch (e) {}
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