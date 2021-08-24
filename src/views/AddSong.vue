<template lang="pug">
include ../mixins/bemto/bemto
+b.add-song-page
  router-link(to="/page")
    Icon(:iconClass="'icon-arrowLeft'", :small="true")
  +e.element
    +b.text-2.--right {{ song.author }} - {{ song.title }} {{ song.bpm }} bpm {{ song.beats }}/{{ song.size }}
  +e.element(v-for="input in inputLines")
    NeuroInputText(
      :label="input.label",
      :inputType="input.type",
      :val="input.val",
      @input-handler="inputHanlder"
    )

  //-   .add-song__beats
  //-     .add-song__nums
  //-       h3 beats
  //-       h3#beatsValue.boxGlow {{ song.beats }}
  //-     input(type="range", min="1", max="16", step="1", v-model="song.beats")
  //-   .add-song__size
  //-     h3 resolution
  //-     .add-song__size-content
  //-       .add-song__size-item.neuro-outpressed(v-for="s in sizesRange")
  //-         label(for="size", @click="markAsPressed(s, '.add-song__size-item')") {{ s }}
  //-           input#size(
  //-             type="radio",
  //-             :value="`${s}`",
  //-             name="size",
  //-             v-model="song.size"
  //-           )
  //-   .add-song__stress
  //-     .add-song__stress-title
  //-       h3 stress first beat:
  //-       span#sfbeat.textGlow {{ song.sFirstBeat }}
  //-     .add-song__stress-content
  //-       label.switch
  //-         input(type="checkbox", v-model="song.sFirstBeat")
  //-         span.slider.round
  //-   .add-song__btn
  //-     button.modal-btn(@click="addSong", :disabled="!isValid") add
  //-     button.modal-btn(@click="goBack") back
</template>

<script>
import controls from "../mixins/controls";
import { mapGetters, mapMutations } from "vuex";
var uniqid = require("uniqid");
export default {
  mixins: [controls],
  data: () => ({
    inputLines: [
      { label: "Author", type: "text" },
      { label: "Song Title", type: "text" },
      { label: "Bpm", type: "number", val: "120" }
    ],
    song: {
      id: null,
      author: "Author",
      title: "SongName",
      bpm: 120,
      beats: "4",
      size: "4",
      sFirstBeat: true
    },
    isValid: true
  }),
  methods: {
    ...mapMutations([
      "ADD_SONG",
      "INCREASE_ID",
      "LOAD_SONG",
      "SET_INFO_MESSAGE",
      "SAVE_LAST_SONG"
    ]),
    inputHanlder(event) {
      console.log(event);
    },
    addSong() {
      this.song.id = uniqid();
      this.ADD_SONG({ ...this.song });
      this.LOAD_SONG(this.song);
      this.SAVE_LAST_SONG(this.song);
      this.$router.push("/");
      this.SET_INFO_MESSAGE("song added");
    },
    goBack() {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["sizesRange", "currentSong"])
  },
  mounted() {
    setTimeout(() => {
      this.markAsPressed(this.song.size, ".add-song__size-item");
    }, 0);
    this.bpmHistory = [120];
  }
};
</script>

<style lang="sass">
// .add-song
//   &__content
//     display: flex
//     justify-content: space-between
//   &__author, .add-song__title, .add-song__bpm, .add-song__beats, .add-song__size, .add-song__stress
//     margin: 1rem 0rem
//     h3
//       font-size: 1rem
//       letter-spacing: .4rem
//       font-weight: 800
//       text-transform: uppercase
//       margin-bottom: 1rem
//     input
//       border: none
//       outline: none
//       width: 100%
//       font-size: 1.2rem
//       padding: 1.5rem
//       color: $akcentLight
//       border-radius: 10px
//       font-weight: 800
//   &__nums
//     display: flex
//     #beatsValue
//       color: $akcentLight
//       margin-left: 1rem
//   &__bpm
//     position: relative
//     input::-webkit-outer-spin-button,
//     input::-webkit-inner-spin-button
//       -webkit-appearance: none
//       margin: 0
//     input[type=number]
//       -moz-appearance: textfield
//   .add-song__nums
//     margin-bottom: .5rem
//   &__bpm-info
//     width: 100%
//     display: flex
//     margin-top: 1rem
//     position: absolute
//     bottom: -20px
//     right: 0%
//     span
//       width: 100%
//       text-align: right
//       font-size: 1.5rem
//       color: red

//   &__size-items
//     margin-top: 1.5rem
//   &__total
//     font-size: 1.5rem
//     color: $akcentLight
//     text-align: right
//   &__btn
//     display: flex
//     justify-content: flex-end
//     button
//       margin-left: 2rem
//       width: 80px
//       height: 40px
//       font-size: 1.5rem
//       &:disabled
//         opacity: .5
// #sfbeat
//   color: $akcentLight
//   font-size: 1.2rem
//   text-transform: uppercase
</style>