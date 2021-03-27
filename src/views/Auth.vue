<template lang="pug">
.auth 
	.error(v-if="error") {{ error.message }}
	h2 authorization
	form(@submit.prevent="checkForm") 
		#email
			label(for="formEmail") email
			input#formEmail.neuroInput(
				type="text",
				v-model.trim="form.email",
				:class="{ invalid: ($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email) }"
			)
			small(v-if="$v.form.email.$dirty && !$v.form.email.required") field is required
			small(v-else-if="$v.form.email.$dirty && !$v.form.email.email") incorrect email
		#password
			label(for="formPassword") Password
			input#formPassword.neuroInput(
				type="text",
				v-model.trim="form.password",
				:class="{ invalid: ($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength) }"
			)
			small(v-if="$v.form.password.$dirty && !$v.form.password.required") field is required
			small(v-else-if="$v.form.password.$dirty && !$v.form.password.minLength") min length {{ $v.form.password.$params.minLength.min }} character
		#authorize
			button.modal-btn(
				:disabled="form.email.length < 1 || form.password.length < 1"
			) log in
			#registration.pointer(@click="$router.push('/reg')") sign-up now
	#loginGoogle.modal-btn(@click="googleAuth()")
		img(src="../assets/img/google.png")
		span log in with google
	#loginFacebook.modal-btn(@click="facebookAuth()")
		img(src="../assets/img/facebook.png")
		span log in facebook
	#noAuthorize 
		button.modal-btn(@click="$router.push({ path: '/' })") use without song list &rArr;
</template>

<script>
/* eslint-disable */
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
	mixin: [],
	data: () => ({
		form: {
			email: "",
			password: ""
		}
	}),
	methods: {
		async checkForm() {
			if (this.$v.form.$invalid) {
				this.$v.form.$touch();
				return;
			}
			const loginData = {
				email: this.form.email,
				password: this.form.password
			};
			try {
				await this.$store.dispatch("login", loginData);
				this.$router.push({
					name: "Main",
					params: { message: "loged in" }
				});
			} catch (e) {}
		},
		async logOut() {
			await this.$store.dispatch("logout");
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
		async facebookAuth(){
			try{
				await this.$store.dispatch("loginFacebook");
				this.$router.push({
					name: "Main",
					params: { message: "loged in" }
				});
			}catch(e){}
			
		}
	},
	computed: {
		...mapGetters(["error"])
	},
	mounted() {
		//this.$store.dispatch("logout");
	},
	validations: {
		form: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(6)
			}
		}
	}
};
</script>
<style lang="sass" scoped>
#loginGoogle 
	margin-top: 2rem
#loginGoogle, #loginFacebook
	align-items: center
	width: 100%
	display: flex
	justify-content: center
	align-items: center
	margin-bottom: 2rem
	img
		width: 3rem
		height: 3rem
		justify-self: end
	span
		font-size: 1.3rem
		text-transform: uppercase
		font-weight: 800
		margin-left: 1rem
		color: var(--akcentLight)
#noAuthorize
	width: 100%
	color: var(--greenCustom)
	button
		width: 100%
		text-transform: uppercase
		font-size: 1.2rem
</style>