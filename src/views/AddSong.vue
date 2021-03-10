<template lang="pug">
.add-song 
	.page__title
		h2 add song
	.page__content
		.add-song__author
			h3 Author
			input.neuroInput(type="text", v-model="author") 
		.add-song__title 
			h3 Title
			input.neuroInput(type="text", v-model="title")
		BeatsMenu
</template>

<script>
import BeatsMenu from "../views/BeatsMenu";
export default {
	components: {
		BeatsMenu
	},
	data: () => ({
		author: "",
		title: "",
		bpm: 0,
		beats: "",
		size: "",
		sFirstBeat: null,
		sizesRange: []
	})
};
</script>

<style lang="sass" scoped>
.add-song
	&__author,.add-song__title
		margin: 2rem 0rem
		h3
			font-size: 1.5rem
			margin: .4rem 0rem
			letter-spacing: .5rem
		input
			border: none
			outline: none
			width: 100%
			font-size: 2rem
			padding: 1.5rem
			color: var(--mainGrey)
			border-radius: 10px
			margin-left: .5rem
	.beats-menu__output
		display: none
</style>