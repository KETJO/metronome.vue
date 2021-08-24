<template lang="pug">
include ../mixins/bemto/bemto
+b.beats-indicator
  +e.content
    +e.item(
      v-for="(beat, i) in Number(currentSong.beats)",
      :class="{ 'first-beat': i == 0 && currentSong.sFirstBeat }"
    )
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentSong"])
  }
};
</script>