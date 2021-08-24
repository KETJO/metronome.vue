<template lang="pug">
include ../../mixins/bemto/bemto
+b.button-type1(@click="clickHandler")
  button {{ title }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return "OK";
      }
    }
  },
  mounted() {},
  methods: {
    clickHandler() {
      this.$emit("click-handler");
    }
  }
};
</script>