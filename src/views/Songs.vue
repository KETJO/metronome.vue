<template lang="pug">
.songs
	.page__title 
		h2 songs
	.page__content
		.songs__items 
			.song.neuroInput(v-for="song in songs") 
				.song__title {{ song.author }} - {{ song.title }}
				.song__bpm {{ song.bpm }}
				.song__beat {{ song.beats }} / {{ song.size }}
				.song__load.textGlow load
		.songs__add-song.neuro-outpressed.btn
			router-link(to="/AddSong") Create New Song
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data: () => ({}),
	computed: {
		...mapGetters(["songs"])
	}
};
</script>

<style lang="sass" scoped>
.songs
	&__items
		overflow: auto
		height: 100%
		width: 100%
		display: flex
		flex-direction: column
		align-items: flex-start
		.song
			width: 95%
			display: grid
			grid-template-columns: 3fr 1fr 1fr 1fr
			padding: 2rem
			justify-content: space-between
			margin: 1.5rem 0rem
			border-radius: 10px
			&__title
				font-size: 1.5rem
				font-family: "Roboto"
				width: 100%
				text-overflow: ellipsis
				overflow: hidden
				white-space: nowrap
			&__bpm
				font-size: 1.5rem
				font-weight: 800
			&__beat
				font-size: 1.5rem
			&__load
				font-size: 1.3rem
				font-weight: 800
				text-transform: uppercase
				color: var(--akcentLight)
				text-align: center
	&__add-song
		margin: 3rem 0rem
</style>