<template lang="pug">
include ../mixins/bemto/bemto
+b.rotate-screen
  +e.items
    +e.item(
      v-for="(beat, i) in Number(currentSong.beats)",
      :class="{ sFbeat: i == 0 && currentSong.sFirstBeat }"
    )
  +e.title Rotate Screen
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentSong"])
  }
};
</script>
