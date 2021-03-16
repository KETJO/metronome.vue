<template lang="pug">
.rotate-screen 
	h2 Rotate Screen
</template>

<script>
export default {
	
}
</script>

<style lang="sass" scoped>
.rotate-screen 
	width: 100vw 
	height: 100vh 
	position: absolute 
	z-index: 10000 
	display: none 
	background-color: var(--mainBg)
	align-items: center 
	justify-content: center 
	font-size: 4rem 
	text-transform: uppercase 
	+L823 
		display: flex
</style>