<template lang="pug">
.down-bar 
	label.play-stop.main-btn.neuro-outpressed.blockSelect.pointer(
		:class="{ neuroPressed: isPlay }",
		@click.prevent="playStop"
	)
		input(type="checkbox", v-model="isPlay")
		span(v-if="!isPlay") play
		span#stopBtn(v-else) stop
	.sounds(@click="changeSound") 
		span {{ instrumentName }}
	.tap.pointer.neuro-outpressed.main-btn(@click="tap('.tap')", ref="tap") 
		span Tap
</template>
<script>
import controls from "../mixins/controls";
import measure from "../mixins/measure";
import { Howl } from "howler";

import { mapGetters, mapMutations } from "vuex";

export default {
	mixins: [controls, measure],
	data: () => ({
		isPlay: false,
		tapBpm: null,
		soundChangeIndex: 0,
		sound: {
			high: "",
			low: ""
		}
	}),
	computed: {
		...mapGetters(["currentSong", "settedSound", "allSounds", "volume"]),
		curVals() {
			return this.currentSong;
		},
		instrumentName() {
			return this.settedSound;
		}
	},
	methods: {
		...mapMutations(["CHANGE_CURRENT_BPM", "CHANGE_SETTED_SOUND"]),
		changeSound() {
			if (this.soundChangeIndex >= this.allSounds.length - 1)
				this.soundChangeIndex = -1;
			this.soundChangeIndex++;
			this.CHANGE_SETTED_SOUND(this.allSounds[this.soundChangeIndex]);
			this.updateSound();
		},
		updateSound() {
			this.sound.high = new Howl({
				src: [`/metronome/media/sounds/${this.settedSound}/1.mp3`],
				volume: this.volume / 100
			});
			this.sound.low = new Howl({
				src: [`/metronome/media/sounds/${this.settedSound}/0.mp3`],
				volume: this.volume / 100
			});
		}
	},
	watch: {
		tapBpm() {
			this.CHANGE_CURRENT_BPM(this.tapBpm);
		}
	},
	mounted() {
		this.updateSound();
		this.$store.subscribe(mutation => {
			if (mutation.type == "CHANGE_VOL") this.updateSound();
		});
	},
	beforeDestroy() {
		this.timerStop();
	}
};
</script>
<style lang="sass" scoped>
.down-bar
	width: 100%
	display: flex
	justify-content: space-between
	align-items: center
	#stopBtn
		color: var(--akcentLight)
	label
		input
			display: none
	.sounds
		font-size: 1rem
		text-transform: uppercase
		border: solid 2px var(--mainGrey)
		padding: 1rem 2rem
		width: 10rem
		display: flex
		justify-content: center
		align-items: center
	.tap
		color: var(--akcentLight)
		text-decoration: none
		-webkit-user-select: none
		-moz-user-select: none
		-ms-user-select: none
		+MW414
			text-decoration: auto
			-webkit-user-select: auto
			-moz-user-select: auto
			-ms-user-select: auto
</style>