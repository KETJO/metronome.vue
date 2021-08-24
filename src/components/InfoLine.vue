<template lang="pug">
include ../mixins/bemto/bemto
+b.info-line
  +e.save-update
    ButtonType1(:title="'update song'", @click-handler="updateSong")

  +e.song-title(v-if="isAuth", @click="$router.push({ name: 'Songs' })")
    h2 {{ currentSong.author }} - {{ currentSong.title }}
  +e.offline(v-else)
    router-link(to="/authType")
      .text offline mode
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ButtonType1 from "../components/button-type1/ButtonType1";

export default {
  components: { ButtonType1 },
  methods: {
    ...mapMutations(["UPDATE_SONG", "SET_INFO_MESSAGE"]),
    updateSong() {
      const song = this.currentSong;
      this.SET_INFO_MESSAGE("song updated");
      this.UPDATE_SONG(song);
    }
  },
  computed: {
    ...mapGetters(["currentSong", "user", "isAuth"])
  }
};
</script>