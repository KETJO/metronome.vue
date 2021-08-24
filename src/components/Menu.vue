<template lang="pug">
include ../mixins/bemto/bemto
+b.menu(:class="{ 'menu--active': menuIsOpen }")
  +e.content
    +e.element(v-if="isAuth")
      +e.user-picture
        .icon.icon-user
    +e.element
      +b.heading-text-2--akcent {{ user }}
    +e.element(@click="CLOSE_ALL_MENU")
      router-link.text-2(v-show="isAuth", to="AddSong") add song
    +e.element.text-2(@click="CLOSE_ALL_MENU")
      router-link.text-2(v-show="isAuth", to="Songs") songs
    +e.element
      +e.feedback.text-2(href="https://www.facebook.com/erlan.zharkeev/") send feedback
    +e.element.text-2(@click="CLOSE_ALL_MENU")
      router-link.text-2(to="About") about
    +e.element(v-if="isAuth", @click="logout")
      a(href="#")
        +e.log-out.text-2.d-flex
          span logout
          .icon.icon-exit
    +e.element(v-else)
      router-link#authorize.text-2(to="/authType") authorize

    +e.element
      +e.theme-switcher
        NeuroInputSwitch(
          :definingСlass="'theme'",
          @click-handler="$store.dispatch('changeTheme')",
          :isActive="themeDark"
        )

    +e.app-version
      span ver.{{ version }}
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import NeuroInputSwitch from "../components/neuro-input-switch/NeuroInputSwitch";
export default {
  components: { NeuroInputSwitch },
  data: () => ({}),

  methods: {
    ...mapActions(["changeTheme"]),
    ...mapMutations([
      "CHANGE_THEME",
      "RESET_STORE",
      "UPDATE_THEME",
      "SET_INFO_MESSAGE",
      "CLOSE_ALL_MENU"
    ]),

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
    ...mapGetters([
      "menuIsOpen",
      "user",
      "isAuth",
      "version",
      "themeDark",
      "currentSong"
    ])
  }
};
</script>
