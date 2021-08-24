<template lang="pug">
include ../mixins/bemto/bemto
+b.volume
  +e.container
    +e.info
      Icon(:iconClass="'icon-volume'", :small="true")
      +e.value
        .text-2 {{ vol }} dB
    label(for="volSlider")
      input#volSlider(
        type="range",
        v-model="vol",
        min="-100",
        max="8",
        step="1",
        @input="changeVol"
      )
</template>

<script>
import { mapMutations } from "vuex";
import controls from "../mixins/controls";
import Icon from "../components/icon/Icon";
export default {
  components: {
    Icon
  },
  mixins: [controls],
  data: () => ({
    vol: "0"
  }),
  methods: {
    ...mapMutations(["CHANGE_VOL"])
  },
  computed: {}
};
</script>