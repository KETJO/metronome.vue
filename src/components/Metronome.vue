<template lang="pug">
.metronome
	.metronome__container 
		TopBar
		router-view 
		.beats-side
			.beats-side__content
				.beat(v-for="beat in Number(curVals.beats)") 
		.title.textGlow 
			h2 {{ curVals.title }}
		.bpm 
			.down.arrow.neuro-outpressed(@click="changeBpm('down')") <
			span.blockSelect {{ curVals.bpm }} bpm
			.up.arrow.neuro-outpressed(@click="changeBpm('up')") >
		.knob
			round-slider(v-model="bpm", :min="20", :max="380", mouseScrollAction="true")
		.down-bar 
			label.play-stop.main-btn.neuro-outpressed.blockSelect.pointer(
				:class="{ neuroPressed: isPlay }"
			)
				input(type="checkbox", v-model="isPlay")
				span(v-if="!isPlay") play
				span#stopBtn(v-else) stop
			.tap.pointer.neuro-outpressed.main-btn.blockSelect(
				@click="tap('.tap')",
				ref="tap"
			) 
				span Tap
</template>
<script>
import TopBar from "./TopBar";
import { mapMutations } from "vuex";
export default {
	components: {
		TopBar
	},
	data: () => ({
		bpm: 120,
		isPlay: false
	}),
	methods: {
		clickOut(clName) {
			const elem = document.querySelector(clName);
			elem.classList.add("neuroPressed");
			setTimeout(() => {
				elem.classList.remove("neuroPressed");
			}, 50);
		},
		tap(clName) {
			this.clickOut(clName);
		},
		changeBpm(direction) {
			this.clickOut(`.${direction}`);
			if (direction === "up" && this.bpm < 380) this.bpm++;
			else if (direction === "down" && this.bpm > 20) this.bpm--;
		},
		...mapMutations(["CHANGE_CURRENT_VALS"])
	},
	computed: {
		curVals() {
			return this.$store.state.currentSong;
		}
	},
	mounted() {
		this.bpm = this.curVals.bpm;
	},
	watch: {
		bpm() {
			const innerKnob = document.querySelector(".rs-handle");
			innerKnob.style.transform = `rotate(-${this.bpm - 10}deg)`;
			const newValues = { ...this._data };
			this.CHANGE_CURRENT_VALS(newValues);
		}
	}
};
</script>

<style lang="sass" scoped>
.metronome
	width: 100%
	height: 100%
	display: flex
	align-items: center
	&__container
		width: 90%
		max-width: 500px
		max-height: 800px
		height: 100%
		margin: 0 auto
		padding: 3rem 0rem
		display: flex
		align-items: center
		justify-content: space-between
		flex-direction: column
.beats-side
	width: 100%
	height: 6rem
	display: flex
	justify-content: space-evenly
	flex-direction: column
	&__content
		display: flex
		justify-content: space-evenly
		width: 100%
		height: 100%
	.beat
		background-color: var(--mainGrey)
		width: 100%
		height: 100%
		margin: 0rem .2rem
		border-radius: 8px
.title
	font-size: 1.5rem
	color: var(--akcentLight)
	text-transform: uppercase
	font-weight: 600
.bpm
	display: flex
	justify-content: center
	align-items: baseline
	span
		font-size: 2.5rem
		font-weight: 800
	.arrow
		font-weight: 800
		font-size: 2rem
		padding: 1rem
		width: 40px
		height: 40px
		border-radius: 50%
		display: flex
		justify-content: center
		align-items: center
		&:first-child
			margin-right: 1.5rem
		&:last-child
			margin-left: 1.5rem
.knob
	width: var(--knobOuter)
	height: var(--knobOuter)
	border-radius: 50%
	position: relative
	display: flex
	justify-content: center
	align-items: center
	box-shadow: 0 5px 15px 2px var(--mainBg), 0 0 0 12px var(--mainGrey)
	z-index: 1
	transform: rotate(45deg)
//
.down-bar
	width: 100%
	display: flex
	justify-content: space-between
	#stopBtn
		color: var(--akcentLight)
	label
		input
			display: none
	.tap
		color: var(--akcentLight)
</style>