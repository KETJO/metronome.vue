<template lang="pug">
include ../mixins/bemto/bemto
+b.main
  +e.body
    TopBar
    BeatsIndicator
    InfoLine
    Volume
    BpmIndicator
    BpmKnob
    DownBar
</template>
<script>
import TopBar from "../components/TopBar";
import BeatsIndicator from "../components/BeatsIndicator";
import InfoLine from "../components/InfoLine";
import Volume from "../components/Volume";
import BpmIndicator from "../components/BpmIndicator";
import BpmKnob from "../components/BpmKnob";
import DownBar from "../components/DownBar";

export default {
  mixins: [],
  components: {
    TopBar,
    BeatsIndicator,
    InfoLine,
    Volume,
    BpmIndicator,
    BpmKnob,
    DownBar
  }
};
</script>

