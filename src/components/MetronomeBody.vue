<template lang="pug">
.metronome-body 
	transition(name="fade")
		.message(v-if="message") {{ message }}

	.beats-side
		.beats-side__content
			.beat(
				v-for="(beat, i) in Number(curVals.beats)",
				:class="{ sFbeat: i == 0 && curVals.sFirstBeat }"
			) 

	.saveUpdate
		.saveUpdate__btn(
			v-if="curVals.id === 0",
			@click="$router.push({ name: 'AddSong' })"
		)
			span save
		.saveUpdate__btn(v-else, @click="updateSong")
			span update
	.title.textGlow
		h2(@click="$router.push({ name: 'Songs' })") {{ curVals.author }} {{ curVals.title }}

	.bpm 
		.down.arrow.blockSelect.pointer.neuro-outpressed(
			@mousedown="changeBpm('down')"
		) <
		span.blockSelect(@click="bpmShowModal = !bpmShowModal", ref="bpm") {{ curVals.bpm }} bpm
		.bpmModal(v-show="bpmShowModal") 
			.bpmModal__content 
				.bpmModalInfo.textGlow 
					span(ref="infoModal") 
				input(type="number", v-model="song.bpm", @input="validate", ref="inpModal")
				button.modal-btn(
					@click="bpmShowModal = !bpmShowModal",
					:disabled="song.bpm < 20"
				) ok
		.up.arrow.blockSelect.pointer.neuro-outpressed(@mousedown="changeBpm('up')") >

	.knob(ref="knob")
		round-slider(
			v-model="song.bpm",
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
import controls from "../mixins/controls";
export default {
	mixins: [controls],
	data: () => ({
		song: {
			bpm: 120
		},
		bpmShowModal: false,
		message: false
	}),
	methods: {
		...mapMutations(["CHANGE_CURRENT_VALS", "UPDATE_SONG"]),
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
		},
		updateSong() {
			const song = this.curVals;
			this.UPDATE_SONG(song);
			this.showMessage("song updated");
		}
	},
	computed: {
		curVals() {
			return this.$store.state.currentSong;
		}
	},
	mounted() {
		this.song.bpm = this.curVals.bpm;
		this.bpmHistory = [120];
	},
	watch: {
		bpmShowModal() {
			if (this.bpmShowModal) {
				setTimeout(() => {
					this.$refs.inpModal.focus();
				}, 0);
			}
		},
		"song.bpm": function() {
			const innerKnob = document.querySelector(".rs-handle");
			innerKnob.style.transform = `rotate(-${this.song.bpm - 10}deg)`;
			const newValues = { ...this.song };
			this.CHANGE_CURRENT_VALS(newValues);
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
	justify-content: space-evenly
	align-items: center
	padding: 2rem 0rem
	color: var(--mainGrey)
.beats-side
	width: 100%
	height: 4rem
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
		border-radius: 2px
		position: relative
		display: flex
		align-items: baseline
		justify-content: center
		&__sfirstMark
			font-size: 1rem
			color: var(--akcentLight)
			height: .3rem
			border-radius: 10px
	+MW414
		height: 1rem
.title
	font-size: 1.5rem
	color: var(--akcentLight)
	text-transform: uppercase
	font-weight: 600
	text-align: center
	h2
		margin: .4rem 0rem
	img
		width: 2.5rem
		height: 2.5rem
		position: absolute
		bottom: -10%
		left: 110%
.saveUpdate
	display: flex
	align-items: center
	justify-content: center
	font-size: 1rem
	text-transform: uppercase
	margin: 1rem 0rem
	span
		border: solid 2px var(--mainGrey)
		padding: .5rem 2rem
		color: var(--mainGrey)
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
		border-radius: 10px
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
	width: 100vw
	height: 100vh
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
.message
	position: absolute
	top: 5%
	left: 50%
	color: var(--akcentLight)
	font-size: 1.5rem
	text-transform: uppercase
	border: solid 2px var(--akcentLight)
	transform: translate(-50%, -50%)
	padding: 1rem 2rem
</style>