<template lang="pug">
.beats-side
	.beats-side__content
		.beat(
			v-for="(beat, i) in Number(currentSong.beats)",
			:class="{ sFbeat: i == 0 && currentSong.sFirstBeat }"
		)
</template>

<script>
import {mapGetters} from "vuex"
export default {
	computed: {
		...mapGetters(['currentSong'])
	}
}
</script>

<style lang="sass" scoped>

</style>