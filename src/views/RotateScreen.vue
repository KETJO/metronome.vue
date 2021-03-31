<template lang="pug">
.rotate-screen 
	.rotate-screen__items 
		.rotate-screen__item.hBeat(
			v-for="(beat, i) in Number(currentSong.beats)",
			:class="{ sFbeat: i == 0 && currentSong.sFirstBeat }"
		)
	h2 Rotate Screen
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(["currentSong"])
	}
};
</script>

<style lang="sass" scoped>
.rotate-screen
	width: 100vw
	height: 100vh
	position: absolute
	z-index: 10000
	display: none
	background-color: var(--mainBg)
	align-items: center
	justify-content: center
	
	text-transform: uppercase
	+L823
		display: flex
	h2
		position: absolute
		color: white
		background-color: black
		padding: 1rem
		font-size: 1.5rem
		width: 100%
		top:0% 
		right: 0%
		text-align: center
		opacity: .4
	&__items
		width: 100%
		height: 100%
		display: flex
	&__item
		width: 100%
		height: 100%
		background-color: var(--mainGrey)
		border: solid black 1px
</style>