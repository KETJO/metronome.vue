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

	data: () => ({
		//
	}),
	mounted() {
		
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
