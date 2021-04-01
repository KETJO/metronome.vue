<template lang="pug">
.down-bar 
	label.play-stop.main-btn.neuro-outpressed.blockSelect.pointer(
		:class="{ neuroPressed: isPlay }",
		@click.prevent="playStop"
	)
		input(type="checkbox", v-model="isPlay")
		span(v-if="!isPlay") play
		span#stopBtn(v-else) stop
	.sounds.pointer(@click="changeSound") 
		span {{ instrumentName }}
	.tap.pointer.neuro-outpressed.main-btn(@click="tap('.tap')", ref="tap") 
		span Tap
</template>
<script>
import controls from "../mixins/controls";
import measure from "../mixins/measure";

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
			let insName = "rim-shot";
			switch (this.settedSound) {
				case "click":
					insName = "click";
					break;
				case "rim-shot":
					insName = "rim-shot";
					break;
				case "hi-hat":
					insName = "hi-hat";
					break;
			}
			return insName;
		}
	},
	methods: {
		...mapMutations(["CHANGE_CURRENT_BPM", "CHANGE_SETTED_SOUND"]),
		changeSound() {
			if (this.soundChangeIndex >= this.allSounds.length - 1)
				this.soundChangeIndex = -1;
			this.soundChangeIndex++;
			this.CHANGE_SETTED_SOUND(this.allSounds[this.soundChangeIndex]);
		},
	},
	watch: {
		tapBpm() {
			this.CHANGE_CURRENT_BPM(this.tapBpm);
		}
	},
	mounted() {
		this.soundChangeIndex = this.allSounds.indexOf(this.settedSound);
	}
};
</script>
<style lang="sass" scoped>
.down-bar
	width: 100%
	height: 8%
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