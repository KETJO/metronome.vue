<template lang="pug">
.down-bar 
	label.play-stop.main-btn.neuro-outpressed.blockSelect.pointer(
		:class="{ neuroPressed: isPlay }"
	)
		input(type="checkbox", v-model="isPlay")
		span(v-if="!isPlay") play
		span#stopBtn(v-else) stop
	.tap.pointer.neuro-outpressed.main-btn.blockSelect(
		@click="tap('.tap')",
		ref="tap"
	) 
		span Tap
</template>
<script>
import mainHandler from "../mixins/mainHandler";
export default {
	mixins: [mainHandler],
	data: () => ({
		isPlay: false
	})
};
</script>
<style lang="sass" scoped>
.down-bar
	width: 100%
	display: flex
	justify-content: space-between
	#stopBtn
		color: var(--akcentLight)
	label
		input
			display: none
	.tap
		color: var(--akcentLight)
</style>