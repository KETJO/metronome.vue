<template lang="pug">
include ../../mixins/bemto/bemto
+b.icon(
  :class="computedClasses",
  @click="clickHandler",
  @mouseover="mouseOverHandler",
  @mouseleave="mouseLeaveHandler"
)
  +e.link.A(v-if="linkUrl", :href="linkUrl", target="_blank")
</template>
<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true,
      default() {
        return "";
      }
    },
    isHovered: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    linkUrl: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    small: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data: () => ({
    hoverClass: ""
  }),
  computed: {
    computedClasses() {
      const isSmall = this.small ? "icon--small" : "";
      return `${this.iconClass} ${this.hoverClass} ${isSmall}`;
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click-handler");
    },
    mouseOverHandler() {
      this.$emit("mouse-over-handler");
      this.isHovered ? (this.hoverClass = "icon--akcent-light") : "";
    },
    mouseLeaveHandler() {
      this.$emit("mouse-leave-handler");
      this.hoverClass = "";
    }
  }
};
</script>