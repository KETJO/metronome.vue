<template lang="pug">
.metronome
	.metronome__container
		router-view.page 
</template>
<script>
export default {};
</script>

<style lang="sass" scoped>
.metronome
	width: 100%
	height: 100%
	display: flex
	align-items: center
	&__container
		position: relative
		width: 90%
		max-width: 500px
		max-height: 750px
		height: 100%
		margin: 0 auto
		display: flex
		align-items: center
		justify-content: space-between
		flex-direction: column
		border-radius: 10px
		box-shadow: 8px 10px 10px var(--boxShadowDark), -1px -3px 10px var(--boxShadowLight)
		+MW500
			box-shadow: none
			max-height: none
</style>