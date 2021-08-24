<template lang="pug">
include ../mixins/bemto/bemto
+b.bpm-indicator
  +e.arrow.icon.icon-left2(@mousedown="changeBpm('down')")
  +e.info(@click="bpmShowModal = !bpmShowModal", ref="bpm") {{ currentSong.bpm }} bpm
  +e.modal(v-show="bpmShowModal")
    BpmModal(@closeModal="bpmShowModal = !bpmShowModal")
  +e.arrow.icon.icon-right2(@mousedown="changeBpm('up')")
</template>

<script>
import BpmModal from "../components/BpmModal";
import controls from "../mixins/controls";

import { mapGetters } from "vuex";

export default {
  mixins: [controls],
  components: {
    BpmModal
  },
  data: () => ({
    song: {
      bpm: 120
    },
    bpmShowModal: false
  }),
  methods: {},
  computed: {
    ...mapGetters(["currentSong"])
  }
};
</script>