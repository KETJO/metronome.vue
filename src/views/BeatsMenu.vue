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
					label(for="size", @click="markAsPressed(s)") {{ s }}
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
export default {
	data: () => ({
		beats: "",
		size: "",
		sFirstBeat: null,
		sizesRange: []
	}),
	methods: {
		...mapMutations(["CHANGE_CURRENT_VALS"]),
		changeCurrentValues() {
			const newValues = { ...this._data };
			this.CHANGE_CURRENT_VALS(newValues);
			this.$router.go(-1);
		},
		markAsPressed(index) {
			const arr = document.querySelectorAll(`.beats-menu__size-item`);
			arr.forEach(item => {
				item.classList.remove("neuroPressed");
				const markItem = item.querySelector(`label`);
				if (markItem.innerText == index)
					item.classList.add("neuroPressed");
			});
		}
	},
	computed: {
		...mapGetters([])
	},
	mounted() {
		this.beats = this.$store.state.currentSong.beats;
		this.size = this.$store.state.currentSong.size;
		this.sFirstBeat = this.$store.state.currentSong.sFirstBeat;
		this.sizesRange = this.$store.state.sizesRange;

		setTimeout(() => {
			this.markAsPressed(this.size);
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
	input
		width: 100%
	input[type=range]
		-webkit-appearance: none
		background: var(--bgOutpressed)
		box-shadow: inset 0px 15px 20px var(--boxShadowDark), inset 0px -5px 30px var(--boxShadowLight), 5px 5px 10px var(--boxShadowDark), -5px -5px 10px var(--boxShadowLight)
		height: 30px
		border-radius: 10px
		padding: 1rem
	input[type=range]::-webkit-slider-thumb
		-webkit-appearance: none
		height: 25px
		width: 25px
		border-radius: 50%
		border: none
		cursor: pointer
		background: var(--bgPressed)
		box-shadow: 5px 5px 8px var(--boxShadowDark), -2px -5px 10px var(--boxShadowLight)
	input[type=range]:focus
		outline: none
	input[type=range]::-ms-track
	&__size-content
		display: flex
	&__size-item
		width: 100%
		margin: 0rem 1rem
		padding: 2rem
		position: relative
		border: .3rem solid var(--mainBg)
		border-radius: 8px
		input[type=radio]
			position: absolute
			width: 100%
			height: 100%
			opacity: 0
		label
			position: absolute
			display: flex
			justify-content: center
			align-items: center
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			width: 100%
			height: 100%
			font-size: 2rem
			color: var(--mainGrey)
			font-weight: 800
	&__stress
		&-title
			display: flex
			span
				color: var(--akcentLight)
				margin-left: .8rem
		.switch
			position: relative
			display: inline-block
			width: 60px
			height: 34px
		.switch input
			opacity: 0
			width: 0
			height: 0
		.slider
			position: absolute
			cursor: pointer
			top: 0
			left: 0
			right: 0
			bottom: 0
			background: var(--bgOutpressed)
			box-shadow: inset 0px 15px 20px var(--boxShadowDark), inset 0px -5px 30px var(--boxShadowLight), 5px 5px 10px var(--boxShadowDark), -5px -5px 10px var(--boxShadowLight)
			-webkit-transition: .4s
			transition: .4s
		.slider:before
			position: absolute
			content: ""
			height: 26px
			width: 26px
			left: 4px
			bottom: 4px
			background: var(--bgPressed)
			box-shadow: 5px 5px 8px var(--boxShadowDark), -2px -5px 10px var(--boxShadowLight)
			-webkit-transition: .4s
			transition: .4s
		input:checked + .slider:before
			-webkit-transform: translateX(26px)
			-ms-transform: translateX(26px)
			transform: translateX(26px)
		.slider.round
			border-radius: 34px
			&:before
				border-radius: 50%
	&__btn
		width: 100%
		margin-top: 4rem
		button
			width: 100%
			color: var(--akcentLight)
			text-transform: uppercase
			font-size: 1.4rem
</style>