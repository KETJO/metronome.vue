<template lang="pug">
#app
	RotateScreen
	Metronome
</template>

<script>
import RotateScreen from "./views/RotateScreen";
import Metronome from "./components/Metronome";

export default {
	name: "App",
	components: {
		RotateScreen,
		Metronome
	},
	methods: {
		async totalSaveChanges() {
			await this.$store.dispatch("totalSaveToFb");
		},
		async registerWorker() {
			if (navigator.serviceWorker) {
				try {
					const reg = await navigator.serviceWorker.register(
						"../sw.js"
					);
					console.log("sw register success", reg);
				} catch (e) {
					console.log("sw register fail");
				}
			}
		}
	},
	beforeCreate() {},
	mounted() {
		const mutationsTypes = [
			"ADD_SONG",
			"UPDATE_SONG",
			"DELETE_SONG",
			"LOAD_SONG",
			"CHANGE_THEME"
		];
		this.$store.subscribe(mutation => {
			mutationsTypes.forEach(mT => {
				if (mT === mutation.type) this.totalSaveChanges();
			});
		});
		//this.registerWorker();
	},
	beforeDestroy() {
		this.totalSaveChanges();
	}
};
</script>

<style lang="sass">
#app
	width: 100%
	height: 100%
	background-color: var(--mainBg)
	font-family: Arial, Helvetica, sans-serif
</style>
