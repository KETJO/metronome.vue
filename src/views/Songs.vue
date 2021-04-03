<template lang="pug">
.songs
	transition(name="fade")
		PreloaderSongs(v-show="!isLoaded")
	router-link(to="/", v-show="isLoaded") 
		.back-arrow.textGlow &#8592;
	.page__content(v-show="isLoaded")
		.songs__items
			router-link.song.neuroInput(
				:to="{ name: 'EditSong', params: { title: song.title, song: song } }"
			)(
				v-for="song in songs"
			) 
				.song__title {{ song.title }} - {{ song.author }}
				.song__bpm {{ song.bpm }}
				.song__beat {{ song.beats }} / {{ song.size }}
				.song__load.textGlow(@click.prevent="loadSong(song)") load
		.songs__add-song.neuro-outpressed.btn
			router-link(to="/AddSong") Create New Song
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	components: {
		PreloaderSongs: () => import("../components/Preloader")
	},
	data: () => ({
		isLoaded: false
	}),
	computed: {
		...mapGetters(["songs"])
	},
	methods: {
		...mapMutations(["LOAD_SONG", "SET_INFO_MESSAGE", "SAVE_LAST_SONG"]),
		loadSong(song) {
			this.LOAD_SONG(song);
			this.SET_INFO_MESSAGE("song loaded");
			this.SAVE_LAST_SONG(song);
			this.$router.push("/");
		}
	},
	mounted() {
		setTimeout(() => {
			this.isLoaded = true;
		}, 1000);
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
			align-items: center
			margin: 1.5rem 0rem
			border-radius: 10px
			&__title
				font-size: 1.5rem
				font-family: "Roboto"
				width: 95%
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
.back-arrow
	font-size: 4rem
	color: var(--akcentLight)
</style>