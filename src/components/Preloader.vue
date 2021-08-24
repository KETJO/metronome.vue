<template lang="pug">
include ../mixins/bemto/bemto
+b.preloader
  +e.title Metronome
  .lds-roller
    div(v-for="(dot, i) in dots", :key="i")
</template>
<script>
export default {
  data: () => ({
    dots: 8
  })
};
</script>
