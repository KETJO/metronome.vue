<template lang="pug">
.app
  transition(name="fade")
    Preloader(v-show="!isLoaded")
  //RotateScreen
  Metronome
  transition(name="fade")
    InfoMessage(v-show="showInfoMessage")
  BeatsMenu
  Menu
</template>

<script>
import Preloader from "./components/Preloader";
// import RotateScreen from "./views/RotateScreen";
import Metronome from "./components/Metronome";
import InfoMessage from "./components/InfoMessage";
import BeatsMenu from "./components/BeatsMenu";
import Menu from "./components/Menu";

import firebase from "firebase/app";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Metronome,
    Preloader,
    BeatsMenu,
    InfoMessage,
    Menu
  },
  data: () => ({
    isAuth: false,
    mutationsTypes: [
      "UPDATE_SONG",
      "CHANGE_THEME",
      "CHANGE_SETTED_SOUND",
      "LOAD_SONG"
    ],
    showInfoMessage: false,
    isLoaded: true
  }),

  methods: {
    async save() {
      await this.$store.dispatch("saveToFb");
    },
    message() {
      this.showInfoMessage = true;
      setTimeout(() => {
        this.showInfoMessage = false;
      }, 2000);
    }
  },
  computed: {
    ...mapGetters(["user", "infoMessage"])
  },
  mounted() {
    //refresh page
    this.$store.dispatch("updateStateFromFb");
    //listen auth
    firebase.auth().onAuthStateChanged(user => {
      const locUid = localStorage.getItem("uid");
      if (!user && locUid) localStorage.removeItem("uid");
    });
    //listen mutations
    this.$store.subscribe(mutation => {
      this.mutationsTypes.forEach(mT => {
        if (mT === mutation.type && this.user) {
          this.save();
        }
      });
      if (mutation.type === "SET_INFO_MESSAGE") this.message();
    });
  }
};
</script>

