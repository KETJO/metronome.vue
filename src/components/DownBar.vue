<template lang="pug">
include ../mixins/bemto/bemto
+b.down-bar
  +e.play-stop
    NeuroButton(
      :title="playBtnTitle",
      :isActive="isPlay",
      @click-handler="playStop"
    )
  +e.sounds
    ButtonType1(:title="instrumentName", @click-handler="changeSound")

  +e.tap
    NeuroButton(
      :title="'Tap'",
      :returningPressed="true",
      @click-handler="tapHandler"
    )
</template>
<script>
import controls from "../mixins/controls";
import playStopHandler from "../mixins/playStopHandler";
import NeuroButton from "../components/neuro-button/NeuroButton";
import ButtonType1 from "../components/button-type1/ButtonType1";

import { mapGetters, mapMutations } from "vuex";

export default {
  mixins: [controls, playStopHandler],
  components: {
    NeuroButton,
    ButtonType1
  },
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
    playBtnTitle() {
      return this.isPlay ? "stop" : "play";
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
    tapHandler() {}
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
