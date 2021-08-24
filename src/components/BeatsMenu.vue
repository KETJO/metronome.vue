<template lang="pug">
include ../mixins/bemto/bemto
+b.beats-menu(:class="{ 'beats-menu--active': beatsMenuIsOpen }")
  +e.element.text-center
    +b.heading-text-1--akcent {{ beats }} / {{ size }}

  +e.element.--small-margin
    +e.title.heading-text-2 beats
    +b.neuro-input-range
      NeuroInputSlider(min="1", max="16", step="1", v-model="beats") {{ beats }}

  +e.element
    +e.title.heading-text-2 resolution
    +e.size-items
      +e.size-item(v-for="sizeNum in sizesRange")
        NeuroButton(
          :title="String(sizeNum)",
          :isActive="size === sizeNum",
          :isBordered="true",
          :isScalable="true",
          @click-handler="size = sizeNum"
        )

  +e.element
    +e.title.heading-text-2 stress first beat
    NeuroInputSwitch(
      :definingСlass="'stress-beat-switch'",
      :isActive="stressFirstBeat",
      @click-handler="stressFirstBeat = !stressFirstBeat"
    )

  +e.element
    ButtonType1(@click-handler="changeCurrentValues")
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import mainHandler from "../mixins/controls";
import CustomSlider from "vue-custom-range-slider";
import NeuroButton from "../components/neuro-button/NeuroButton";
import ButtonType1 from "../components/button-type1/ButtonType1";
import NeuroInputSwitch from "../components/neuro-input-switch/NeuroInputSwitch";

export default {
  mixins: [mainHandler],
  components: {
    NeuroInputSlider: CustomSlider,
    NeuroButton,
    ButtonType1,
    NeuroInputSwitch
  },
  data: () => ({
    beats: "",
    size: null,
    stressFirstBeat: true
  }),
  created() {},
  methods: {
    ...mapMutations(["CHANGE_CURRENT_VALS", "CLOSE_ALL_MENU"]),
    changeCurrentValues() {
      const newValues = { ...this._data };
      this.CHANGE_CURRENT_VALS(newValues);
      this.CLOSE_ALL_MENU();
    }
  },
  computed: {
    ...mapGetters(["beatsMenuIsOpen", "sizesRange", "currentSong"])
  },
  mounted() {
    this.beats = this.currentSong.beats;
    this.size = this.currentSong.size;
    this.sFirstBeat = this.currentSong.sFirstBeat;
  }
};
</script>

