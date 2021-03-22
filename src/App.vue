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
	metaInfo: {
		title: 'Metronome'
	},
	components: {
		RotateScreen,
		Metronome
	},

	data: () => ({
		//
	}),
	methods: {

		async totalSaveChanges() {
			await this.$store.dispatch("totalSaveToFb");
		}
	},
	beforeCreate() {},
	mounted() {
		const mutationsTypes = ["ADD_SONG", "UPDATE_SONG", "DELETE_SONG", "LOAD_SONG", "CHANGE_THEME"];
		this.$store.subscribe(mutation => {
			mutationsTypes.forEach(mT => {
				if (mT === mutation.type) this.totalSaveChanges();
			});
		});
		
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
