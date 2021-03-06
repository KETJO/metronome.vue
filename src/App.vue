<template lang="pug">
#app
  Metronome
</template>

<script>
import Metronome from './components/Metronome';

export default {
  name: 'App',

  components: {
    Metronome,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
@import "@/assets/styles/sass/style"
#app 
  width: 100%
  height: 100%
  background-color: var(--mainBg)
  font-family: Arial, Helvetica, sans-serif
</style>
