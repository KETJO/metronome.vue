<template lang="pug">
include ../mixins/bemto/bemto
+b.about-page
  router-link(to="/")
    Icon(:iconClass="'icon-arrowLeft'")
  +b.heading-text-1.--right About
  +e.content
    +b.text-2.--right Current version {{ version }}
      br
      | If you like this app or maybe
      br
      | you have any suggestions for improvement
      br
      | please contact me:
      .d-inline-flex
        Icon.ml-4(
          :iconClass="'icon-facebook'",
          :linkUrl="'https://www.facebook.com/erlan.zharkeev/'"
        )
        Icon.ml-4(
          :iconClass="'icon-github'",
          :linkUrl="'https://github.com/KETJO/metronome.vue'"
        )
</template>

<script>
import { mapGetters } from "vuex";
import Icon from "../components/icon/Icon";
export default {
  components: {
    Icon
  },
  computed: {
    ...mapGetters(["version"])
  }
};
</script>

