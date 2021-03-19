<template lang="pug">
transition(name="fade")
	.beats-menu
		.beats-menu__output.textGlow 
			h1 {{ beats }} / {{ size }}
		.beats-menu__beats
			.beats-menu__beats-title
				h2 beats
			.beats-menu__beats-content
				input(type="range", min="1", max="16", step="1", v-model="beats") 
		.beats-menu__size
			.beats-menu__size-title
				h2 size
			.beats-menu__size-content 
				.beats-menu__size-item.neuro-outpressed(v-for="s in sizesRange")
					label(for="size", @click="markAsPressed(s, '.beats-menu__size-item')") {{ s }}
						input#size(type="radio", :value="`${s}`", name="size", v-model="size")
		.beats-menu__stress
			.beats-menu__stress-title 
				h2 stress first beat:
				span.textGlow {{ sFirstBeat }}
			.beats-menu__stress-content 
				label.switch 
					input(type="checkbox", v-model="sFirstBeat") 
					span.slider.round
		.beats-menu__btn 
			button.neuro-outpressed.main-btn(@click="changeCurrentValues") ok
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import mainHandler from "../mixins/controls";
export default {
	mixins: [mainHandler],
	components: {},
	data: () => ({
		beats: "",
		size: "",
		sFirstBeat: null
	}),
	methods: {
		...mapMutations(["CHANGE_CURRENT_VALS"]),
		changeCurrentValues() {
			const newValues = { ...this._data };
			this.CHANGE_CURRENT_VALS(newValues);
			this.$emit("closeBeatsMenu");
		}
	},
	computed: {
		...mapGetters(["sizesRange"])
	},
	mounted() {
		this.beats = this.$store.state.currentSong.beats;
		this.size = this.$store.state.currentSong.size;
		this.sFirstBeat = this.$store.state.currentSong.sFirstBeat;

		setTimeout(() => {
			this.markAsPressed(this.size, ".beats-menu__size-item");
		}, 0);
	}
};
</script>

<style lang="sass" scoped>
.beats-menu
	width: 100%
	height: 100%
	background-color: var(--mainBg)
	z-index: 4
	display: flex
	align-items: center
	justify-content: center
	flex-direction: column
	align-items: center
	padding: 4rem
	&__output
		font-size: 4rem
		color: var(--akcentLight)
	&__beats, .beats-menu__size, .beats-menu__stress
		width: 100%
	&__beats-title, .beats-menu__size-title, .beats-menu__stress-title
		font-size: 2rem
		text-transform: uppercase
		font-weight: 800
		margin: 2rem 0rem
		width: 100%
	&__btn
		width: 100%
		margin-top: 4rem
		button
			width: 100%
			color: var(--akcentLight)
			text-transform: uppercase
			font-size: 1.4rem
</style>