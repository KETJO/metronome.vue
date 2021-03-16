<template lang="pug">
.main 
	TopBar
	MetronomeBody
	DownBar
</template>
<script>
import TopBar from "../components/TopBar";
import DownBar from "../components/DownBar";
import MetronomeBody from "../components/MetronomeBody";

export default {
	components: {
		TopBar,
		DownBar,
		MetronomeBody
	},
	methods: {},
	beforeMount() {}
};
</script>

<style lang="sass" scoped>
.main
	display: flex
	flex-direction: column
</style>