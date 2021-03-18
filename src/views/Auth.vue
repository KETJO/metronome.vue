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
			#registration(@click="$router.push('/reg')") sign-up now
</template>

<script>
/* eslint-disable */
import { required, email, minLength } from "vuelidate/lib/validators";
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
		}
	},
	computed: {
		error() {
			return this.$store.state.error;
		}
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
</style>