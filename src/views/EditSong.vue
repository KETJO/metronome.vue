<template lang="pug">
.edit-song
  .add-song
    .page__content.add-song__content.remove-scroll-bar
      .add-song__total.textGlow {{ song.author }}-{{ song.title }} {{ song.bpm }} bpm {{ song.beats }}/{{ song.size }}
      .add-song__author
        h3 Author
        input.neuro-input(type="text", v-model="song.author")
      .add-song__title
        h3 Title
        input.neuro-input(
          type="text",
          v-model="song.title",
          @input="totalValid()"
        )
      .add-song__bpm
        h3 bpm
        input.neuro-input(
          type="number",
          v-model="song.bpm",
          @input="validate(); totalValid()"
        )
        .add-song__bpm-info
          span(ref="infoModal")
      .add-song__beats
        h3 beats
        input(type="range", min="1", max="16", step="1", v-model="song.beats")
      .add-song__size
        h3 size
        .add-song__size-content
          .add-song__size-item.neuro-outpressed(v-for="s in sizesRange")
            label(
              for="size",
              @click="markAsPressed(s, '.add-song__size-item')"
            ) {{ s }}
              input#size(
                type="radio",
                :value="`${s}`",
                name="size",
                v-model="song.size"
              )
      .add-song__stress
        .add-song__stress-title
          h3 stress first beat:
          span#sfbeat.textGlow {{ song.sFirstBeat }}
        .add-song__stress-content
          label.switch
            input(type="checkbox", v-model="song.sFirstBeat")
            span.slider.round
      .add-song__btn
        button.modal-btn(@click="updateSong", :disabled="!isValid") update
        button.modal-btn(@click="deleteSong") delete
</template>

<script>
import controls from "../mixins/controls";
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    song: {},
    isValid: true,
    originalTitle: ""
  }),
  mixins: [controls],
  computed: {
    ...mapGetters(["sizesRange"])
  },
  methods: {
    ...mapMutations(["UPDATE_SONG", "DELETE_SONG"]),
    updateSong() {
      const song = this.song;
      this.UPDATE_SONG(song);
      this.$router.go(-1);
    },
    deleteSong() {
      const song = this.song;
      this.DELETE_SONG(song);
      this.$router.go(-1);
    }
  },
  components: {},
  mounted() {
    this.song = { ...this.$route.params.song };
    this.originalTitle = this.$route.params.song.title;
    setTimeout(() => {
      this.markAsPressed(this.song.size, ".add-song__size-item");
    }, 0);
    this.bpmHistory = [120];
  }
};
</script>

