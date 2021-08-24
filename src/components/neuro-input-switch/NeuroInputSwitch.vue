<template lang="pug">
include ../../mixins/bemto/bemto
+b.neuro-input-switch.LABEL(
  :class="definingСlass",
  @click.prevent="clickHandler"
)
  input(type="checkbox", :checked="isActive")
  +e.slider
</template>

<script>
export default {
  props: {
    definingСlass: {
      type: String,
      required: false,
      default() {
        return false;
      }
    },
    isActive: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  computed: {},
  methods: {
    clickHandler() {
      this.$emit("click-handler");
    }
  }
};
</script>