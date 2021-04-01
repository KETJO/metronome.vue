<template lang="pug">
#app
	transition(name="fade")
		Preloader(v-show="!isLoaded")
	RotateScreen
	Metronome
	transition(name="fade")
		.infoMessage.boxGlow(v-show="showInfoMessage") 
			span {{ infoMessage }}
</template>

<script>
import Preloader from "./components/Preloader";
import RotateScreen from "./views/RotateScreen";
import Metronome from "./components/Metronome";
import firebase from "firebase/app";
import { mapGetters } from "vuex";
export default {
	name: "App",
	components: {
		RotateScreen,
		Metronome,
		Preloader
	},
	data: () => ({
		isAuth: false,
		mutationsTypes: ["UPDATE_SONG", "CHANGE_THEME", "CHANGE_SETTED_SOUND"],
		showInfoMessage: false,
		isLoaded: false
	}),

	methods: {
		async save() {
			await this.$store.dispatch("saveToFb");
		},
		message() {
			this.showInfoMessage = true;
			setTimeout(() => {
				this.showInfoMessage = false;
			}, 2000);
		}
	},
	computed: {
		...mapGetters(["user", "infoMessage"])
	},
	mounted() {
		//refresh page
		this.$store.dispatch("updateStateFromFb");
		//listen auth
		firebase.auth().onAuthStateChanged(user => {
			const locUid = localStorage.getItem("uid");
			if (!user && locUid) localStorage.removeItem("uid");
		});
		//listen mutations
		this.$store.subscribe(mutation => {
			this.mutationsTypes.forEach(mT => {
				if (mT === mutation.type && this.user) {
					this.save();
				}
			});
			if (mutation.type === "SET_INFO_MESSAGE") this.message();
		});
		//
		setTimeout(() => {
			this.isLoaded = true;
		}, 1500);
	}
};
</script>

<style lang="sass">
#app
	width: 100%
	height: 100%
	background-color: var(--mainBg)
	font-family: Arial, Helvetica, sans-serif
.infoMessage
	top: 50%
	left: 50%
	transform: translate(-50%,-50%)
	position: fixed
	width: 25rem
	background-color: rgba(0,0,0,.8)
	border-radius: 10px
	z-index: 1000
	border-radius: 5px
	border: 2px solid var(--akcentLight)
	display: flex
	justify-content: center
	align-items: center
	span
		color: var(--akcentLight)
		font-size: 1.5rem
		padding: 2rem
		font-weight: 800
		text-transform: uppercase
		width: 100%
		text-align: center
		line-height: 1.5rem
</style>
