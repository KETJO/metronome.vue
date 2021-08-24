<template lang="pug">
.auth
  h2 email authorization
  form(@submit.prevent="checkForm")
    #email
      label(for="formEmail") email
      input#formEmail.neuro-input(
        type="text",
        v-model.trim="form.email",
        :class="{ invalid: ($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email) }"
      )
      small(v-if="$v.form.email.$dirty && !$v.form.email.required") field is required
      small(v-else-if="$v.form.email.$dirty && !$v.form.email.email") incorrect email
    #password
      label(for="formPassword") Password
      input#formPassword.neuro-input(
        type="text",
        v-model.trim="form.password",
        :class="{ invalid: ($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength) }"
      )
      small(v-if="$v.form.password.$dirty && !$v.form.password.required") field is required
      small(v-else-if="$v.form.password.$dirty && !$v.form.password.minLength") min length {{ $v.form.password.$params.minLength.min }} character
    .auth-type
      .icon.icon-google
      .icon.icon-facebook
    #authorize
      button.modal-btn(
        :disabled="form.email.length < 1 || form.password.length < 1"
      ) log in
      #registration.pointer(@click="$router.push('/reg')") sign-up now
</template>

<script>
/* eslint-disable */
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapMutations, mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
export default {
  mixin: [],
  data: () => ({
    form: {
      email: "",
      password: ""
    }
  }),
  computed: {
    ...mapGetters(["lastSong"])
  },
  methods: {
    ...mapActions(["getData", "accessAllowed"]),
    ...mapMutations(["SET_NEW_STATE", "SET_INFO_MESSAGE"]),
    async checkForm() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        return;
      }
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password);
        const uid = await this.$store.dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/`)
          .on("value", snap => {
            const data = snap.val();
            this.SET_NEW_STATE(data);
          });
        this.LOAD_SONG(this.lastSong);
        this.accessAllowed("loged in with Email");
      } catch (e) {
        this.SET_INFO_MESSAGE(e.message);
        console.log("failed to access with email", e.message);
      }
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
.auth
  h2
    right: 0rem
</style>