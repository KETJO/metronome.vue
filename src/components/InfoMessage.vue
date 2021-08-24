<template lang="pug">
include ../mixins/bemto/bemto
+b.info-message.box-glow
  +e.text {{ infoMessage }}
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["infoMessage"])
  }
};
</script>