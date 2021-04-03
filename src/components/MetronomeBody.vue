<template lang="pug">
.metronome-body 
	Beats
	.info
		.saveUpdate.pointer(v-if="user.length > 0")
			.saveUpdate__btn(@click="updateSong") update song

		.title.textGlow.pointer(v-if="user.length > 0")
			h2(@click="$router.push({ name: 'Songs' })") {{ currentSong.author }} - {{ currentSong.title }}
		.info-offline(v-else)
			router-link(to="/authType") 
				h2 offline mode

	.volume 
		.volume__container 
			img(src="../assets/img/volume.png", alt="volume")
			label(for="volSlider")
				input#volSlider(
					type="range",
					v-model="vol",
					min="-100",
					max="8",
					step="1",
					@input="changeVol"
				)
	.bpm 
		.down.arrow.blockSelect.pointer.neuro-outpressed(
			@mousedown="changeBpm('down')"
		) <
		span.blockSelect.pointer(@click="bpmShowModal = !bpmShowModal", ref="bpm") {{ currentSong.bpm }} bpm
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
			:max="300",
			line-cap="round",
			radius="105",
			:update="theming",
			:change="stopTheming",
			:animation="false"
		)
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import controls from "../mixins/controls";
import Beats from "../components/Beats";
export default {
	mixins: [controls],
	components: {
		Beats
	},
	data: () => ({
		song: {
			bpm: 120
		},
		vol: "0",
		bpmShowModal: false
	}),
	methods: {
		...mapMutations([
			"CHANGE_CURRENT_VALS",
			"UPDATE_SONG",
			"CHANGE_VOL",
			"SET_INFO_MESSAGE",
			"UPDATE_THEME",
			"LOAD_SONG"
		]),
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
			const song = this.currentSong;
			this.SET_INFO_MESSAGE("song updated");
			this.UPDATE_SONG(song);
		},
		loadLastSong() {
			const song = this.lastSong;
			if (song) this.LOAD_SONG(song);
			else
				this.LOAD_SONG({
					id: "0aaaaaaaa",
					author: "Pantera",
					title: "Walk",
					bpm: 120,
					beats: "4",
					size: "4",
					sFirstBeat: true
				});
		},
		async save() {
			this.loadLastSong();
			await this.$store.dispatch("saveToFb");
		}
	},
	computed: {
		...mapGetters(["volume", "currentSong", "user", "lastSong"])
	},
	mounted() {
		this.song.bpm = this.currentSong.bpm;
		this.bpmHistory = [120];
		this.vol = this.volume;

		this.$store.subscribe(mutation => {
			if (mutation.type === "CHANGE_CURRENT_BPM")
				this.song.bpm = this.currentSong.bpm;
		});

		setTimeout(() => {
			this.UPDATE_THEME();
		}, 2000);
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
	height: 75%
	display: grid
	grid-template-columns: 1fr
	justify-items: center
	align-items: center
	color: var(--mainGrey)
	position: relative
.volume
	width: 100%
	&__container
		display: flex
		justify-content: space-between
		align-items: center
	img
		width: 3rem
		height: 3rem
	label
		width: 100%
		display: flex
		justify-content: flex-end
	input
		width: 98%
		height: 7px
		-webkit-appearance: none
		background-color: var(--mainGrey)
		border-radius: 0%
	input[type=range]::-webkit-slider-thumb
		-webkit-appearance: none
		height: 15px
		width: 35px
		background-color: var(--akcentLight)
		border: solid 1px var(--akcentLight)
		box-shadow: 0px 0px 40px var(--akcentLight)
		&:hover
			cursor: pointer

.title
	font-size: 1.5rem
	color: var(--akcentLight)
	text-transform: uppercase
	font-weight: 600
	text-align: center
	width: 60%
	h2
		text-align: right
		overflow: hidden
		white-space: nowrap
		text-overflow: ellipsis
	img
		width: 2.5rem
		height: 2.5rem
		position: absolute
		bottom: -10%
		left: 110%
.info
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	align-self: flex-end
	height: 3rem
.info-offline
	width: 100%
	display: flex
	justify-content: center
	align-items: flex-end
	h2
		font-size: 2.5rem
		color: var(--akcentLight)
		text-transform: uppercase
.saveUpdate
	display: flex
	align-items: center
	justify-content: center
	font-size: 1rem
	text-transform: uppercase
	margin: 1rem 0rem
	width: 30%
	&__btn
		width: 100%
		border: solid 2px var(--mainGrey)
		padding: .5rem 0rem
		color: var(--mainGrey)
		width: 100%
		display: flex
		justify-content: center

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
		border-radius: 5px
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
	align-self: center
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
				-webkit-appearance: none
		input[type='number']
			-moz-appearance: textfield
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button
			-webkit-appearance: none
		button
			margin-top: 6rem
			&:disabled
				opacity: .3
</style>