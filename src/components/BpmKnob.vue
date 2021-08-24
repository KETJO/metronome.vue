<template lang="pug">
include ../mixins/bemto/bemto
+b.knob(ref="knob")
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
export default {
  data: () => ({
    song: {
      bpm: 120
    }
  }),
  mixins: [controls],
  methods: {
    ...mapMutations(["UPDATE_SONG", "SET_INFO_MESSAGE"]),
    theming() {
      this.$refs.bpm.classList.add("textGlow");
      this.$refs.bpm.style.color = "$akcentLight";
      this.$refs.knob.classList.add("boxGlow");
      this.$refs.knob.style.border = "5px solid $akcentLight";
    },
    stopTheming() {
      this.$refs.bpm.classList.remove("textGlow");
      this.$refs.bpm.style.color = "inherit";
      this.$refs.knob.classList.remove("boxGlow");
      this.$refs.knob.style.border = "none";
    }
  },
  computed: {
    ...mapGetters(["currentSong", "user"])
  }
};
</script>