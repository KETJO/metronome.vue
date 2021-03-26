<template lang="pug">
#app
	RotateScreen
	Metronome
</template>

<script>
import RotateScreen from "./views/RotateScreen";
import Metronome from "./components/Metronome";
import firebase from "firebase/app";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
	name: "App",
	components: {
		RotateScreen,
		Metronome
	},
	methods: {
		...mapActions(["updateTheme"]),
		...mapMutations(["UPDATE_STATE_FROM_LOCAL"]),
		async totalSaveChanges() {
			await this.$store.dispatch("totalSaveToFb");
		}
	},
	beforeCreate() {},
	computed: {
		...mapGetters(["user"])
	},
	mounted() {
		let isAuth = false;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) isAuth = true;
			else isAuth = false;
		});
		const mutationsTypes = [
			"ADD_SONG",
			"UPDATE_SONG",
			"DELETE_SONG",
			"LOAD_SONG",
			"CHANGE_THEME"
		];
		this.$store.subscribe(mutation => {
			mutationsTypes.forEach(mT => {
				if (mT === mutation.type && isAuth) {
					this.totalSaveChanges();
					this.$store.dispatch("saveToLocSto");
				}
			});
		});
		if (this.user === "") this.UPDATE_STATE_FROM_LOCAL();
		this.updateTheme();
	},
	beforeUpdate() {},
	beforeDestroy() {}
};
</script>

<style lang="sass">
#app
	width: 100%
	height: 100%
	background-color: var(--mainBg)
	font-family: Arial, Helvetica, sans-serif
</style>
