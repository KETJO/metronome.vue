<template lang="pug">
include ../mixins/bemto/bemto
+b.metronome(:class="menuClasses", @click="closeMenuHandler($event)")
  +e.container
    router-view.page
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    menus: ["menuIsOpen", "beatsMenuIsOpen"]
  }),
  methods: {
    ...mapMutations(["CLOSE_ALL_MENU"]),
    closeMenuHandler(e) {
      e.target.classList.contains("covered") ? this.CLOSE_ALL_MENU() : null;
    }
  },

  computed: {
    ...mapGetters(["menuIsOpen", "beatsMenuIsOpen"]),
    menuClasses() {
      let classes = "";
      if (this.menuIsOpen) {
        classes = "metronome--menu-active covered";
      } else if (this.beatsMenuIsOpen) {
        classes = "metronome--beats-menu-active covered";
      }
      return classes;
    }
  }
};
</script>