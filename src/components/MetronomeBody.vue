<template lang="pug">
.metronome-body 
	.beats-side
		.beats-side__content
			.beat(v-for="beat in Number(curVals.beats)") 
	.title.textGlow 
		h2 {{ curVals.title }}
	.bpm 
		.down.arrow.blockSelect.pointer.neuro-outpressed(
			@mousedown="changeBpm('down')"
		) <
		span.blockSelect(@click="bpmShowModal = !bpmShowModal", ref="bpm") {{ curVals.bpm }} bpm
		.bpmModal(v-show="bpmShowModal") 
			.bpmModal__content 
				.bpmModalInfo.textGlow 
					span(ref="infoModal") 
				input(type="number", v-model="bpm", @input="validate", ref="inpModal")
				button.modal-btn(
					@click="bpmShowModal = !bpmShowModal",
					:disabled="bpm < 20"
				) ok
		.up.arrow.blockSelect.pointer.neuro-outpressed(@mousedown="changeBpm('up')") >

	.knob(ref="knob")
		round-slider(
			v-model="bpm",
			:min="20",
			:max="380",
			line-cap="round",
			radius="105",
			:update="theming",
			:change="stopTheming"
		)
</template>

<script>
import { mapMutations } from "vuex";
import mainHandler from "../mixins/mainHandler";
export default {
	mixins: [mainHandler],
	data: () => ({
		bpm: 120,
		bpmShowModal: false,
		bpmHistory: [120]
	}),
	methods: {
		...mapMutations(["CHANGE_CURRENT_VALS"]),
		validate() {
			const str = String(this.bpm);
			if (str.match(/^\d+$/) || str === "") {
				if (this.bpm < 20) {
					this.$refs.infoModal.textContent = "min value 20";
				} else if (this.bpm > 380) {
					this.$refs.infoModal.textContent = "max value 380";
					this.bpm = this.bpmHistory[this.bpmHistory.length - 1];
				} else {
					this.$refs.infoModal.textContent = "";
				}
				this.bpmHistory.push(this.bpm);
			} else this.bpm = this.bpmHistory[this.bpmHistory.length - 1];
		},
		theming() {
			this.$refs.bpm.classList.add("textGlow");
			this.$refs.bpm.style.color = "var(--akcentLight)";
			this.$refs.knob.classList.add("boxGlow");
			this.$refs.knob.style.border = "5px solid var(--akcentLight)";
		},
		stopTheming() {
			this.$refs.bpm.classList.remove("textGlow");
			this.$refs.bpm.style.color = "inherit";
			this.$refs.knob.classList.remove("boxGlow");
			this.$refs.knob.style.border = "none";
		}
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
		bpmShowModal() {
			if (this.bpmShowModal) {
				setTimeout(() => {
					this.$refs.inpModal.focus();
				}, 0);
			}
		}
	}
};
</script>

<style lang="sass" scoped>
.metronome-body
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	justify-content: space-between
	align-items: center
	padding: 3rem 0rem
	color: var(--mainGrey)
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
//INPUTMODAL//
.bpmModal
	width: 100%
	height: 100%
	position: absolute
	background-color: rgba(0,0 ,0 ,0.8)
	z-index: 3
	top: 50%
	left: 50%
	transform: translate(-50%,-50%)
	display: flex
	justify-content: center
	align-items: center
	&__content
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		.bpmModalInfo
			color: var(--akcentLight)
			margin-bottom: 3rem
			font-size: 1.5rem
			position: absolute
			top: 20%
			span
		input
			border: solid 1px var(--akcentLight)
			padding: 2rem
			font-size: 3rem
			width: 15rem
			text-align: center
			border-radius: 10px
			color: white
			background-color: transparent
			-webkit-appearance: none
			&:focus
				box-shadow: 0px 0px 35px var(--akcentLight)
		button
			margin-top: 6rem
			&:disabled
				opacity: .3
</style>