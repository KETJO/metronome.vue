<template lang="pug">
.about 
	.page__title.about__title 
		router-link(to="/") 
			.back-arrow.textGlow &#8592;
		h2 About
	.page__content.about__content
		p#version Current version 1.1

		p Hi, there! My name is
			a(href="https://www.facebook.com/erlan.zharkeev/") Erlan Zharkeev
		p I created this project for my education in VUE.js.
		p If you like this app or maybe you have any suggestions for improvement please contact me:
			a(href="mailto:zharkeev.post@gmail.com") zharkeev.post@gmail.com
		a#github(href="https://github.com/KETJO/metronome.vue") https://github.com/KETJO/metronome.vue
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.about
	display: flex
	align-items: flex-end
	justify-content: center
	flex-direction: column
	width: 100%
	height: 100%
	&__title
		width: 100%
		display: flex
		justify-content: space-between
		.back-arrow
			font-size: 4rem
			color: var(--akcentLight)
	&__content
		font-weight: 800
		display: flex
		align-items: flex-end
		justify-content: center
		p
			font-size: 2rem
			line-height: 4rem
		a
			color: var(--akcentLight)
			margin-left: .5rem
	#github
		margin-top: 4rem
		font-size: 1.5rem
</style>