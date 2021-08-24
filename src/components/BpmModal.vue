<template lang="pug">
include ../mixins/bemto/bemto
+b.bpm-modal
  +e.content
    +e.info.text-glow
      span(ref="infoModal")
    input(type="number", v-model="song.bpm", @input="validate", ref="inpModal")
    .icon.icon-cross(@click="$emit('closeModal')")
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  data: () => ({
    song: {
      bpm: 120
    }
  }),
  methods: {
    validate() {
      const str = String(this.song.bpm);
      if (str.match(/^\d+$/) || str === "") {
        if (this.song.bpm < 20) {
          this.$refs.infoModal.textContent = "min value 20";
        } else if (this.song.bpm > 300) {
          this.$refs.infoModal.textContent = "max value 300";
          this.song.bpm = this.bpmHistory[this.bpmHistory.length - 1];
        } else {
          this.$refs.infoModal.textContent = "";
        }
        this.bpmHistory.push(this.bpm);
      } else this.song.bpm = this.bpmHistory[this.bpmHistory.length - 1];
    }
  }
};
</script>