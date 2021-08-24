<template lang="pug">
include ../mixins/bemto/bemto
+b.top-bar
  +e.beats-btn
    NeuroButton(
      :title="beatsMenuTitle",
      :isActive="beatsMenuIsOpen",
      @click-handler="TOGGLE_MENU('beatsMenuIsOpen')"
    )
  +e.menu-btn
    NeuroButton(
      :title="'menu'",
      :isActive="menuIsOpen",
      @click-handler="TOGGLE_MENU('menuIsOpen')"
    )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BeatsMenu from "../components/BeatsMenu";
import Menu from "../components/Menu";
import NeuroButton from "../components/neuro-button/NeuroButton";

export default {
  components: {
    BeatsMenu,
    Menu,
    NeuroButton
  },
  data: () => ({}),
  methods: {
    ...mapActions(["updateTheme"]),
    ...mapMutations([
      "CHANGE_THEME",
      "RESET_STORE",
      "UPDATE_THEME",
      "SET_INFO_MESSAGE",
      "TOGGLE_MENU"
    ]),

    changeTheme() {
      this.CHANGE_THEME();
      this.UPDATE_THEME();
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/authType");
      const resetStore = {
        info: {
          user: "",
          infoMessage: ""
        }
      };
      this.RESET_STORE(resetStore);
      this.SET_INFO_MESSAGE("logged out");
    }
  },
  computed: {
    ...mapGetters(["menuIsOpen", "beatsMenuIsOpen", "currentSong"]),
    beatsMenuTitle() {
      return `${this.currentSong.beats} / ${this.currentSong.size}`;
    }
  }
};
</script>
