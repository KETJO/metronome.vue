<template lang="pug">
.beats-menu(v-show="beatsMenu")
	.beats-menu__output 
		h1 {{ beats }} / {{ size }}
	.beats-menu__beats
		.beats-menu__beats-title
			h2 beats
		.beats-menu__beats-content 
			input(type="range", min="1", max="16", step="1", v-model="beats") 
	.beats-menu__size
		.beats-menu__size-title
			h2 size
		.beats-menu__size-content 
			.beats-menu__size-item.neuro-outpressed(v-for="s in sizesRange")
				label(for="size", @click="markAsPressed(s)") {{ s }}
					input#size(type="radio", :value="`${s}`", name="size", v-model="size")
	.beats-menu__stress
		.beats-menu__stress-title 
			h2 stress first beat: {{ sFirstBeat }}
		.beats-menu__stress-content 
			label.switch 
				input(type="checkbox", v-model="sFirstBeat") 
				span.slider.round
	.beats-menu__btn 
		button.neuro-outpressed(@click="beatsMenu = !beatsMenu") ok
</template>

<script>
export default {

};
</script>

<style lang="sass" scoped>
.beats-menu
	position: absolute
	top: 0%
	left: 0%
	width: 100%
	height: 100%
	background-color: var(--mainDark)
	padding: 2rem
	z-index: 2
	display: flex
	align-items: center
	justify-content: center
	flex-direction: column
	align-items: center
	&__output
		font-size: 4rem
		color: var(--mainGrey)
	&__beats, .beats-menu__size, .beats-menu__stress
		width: 100%
	&__beats-title, .beats-menu__size-title, .beats-menu__stress-title
		font-size: 2rem
		color: var(--mainGrey)
		text-transform: uppercase
		font-weight: 800
		margin: 2rem 0rem
		width: 100%
	input
		width: 100%
	input[type=range]
		-webkit-appearance: none
		background: linear-gradient(145deg, #1e2125, #23282c)
		box-shadow: inset 0px 15px 20px var(--boxShadowDark), inset 0px -5px 30px var(--boxShadowLight), 5px 5px 10px var(--boxShadowDark), -5px -5px 10px var(--boxShadowLight)
		height: 30px
		border-radius: 10px
		padding: 1rem
	input[type=range]::-webkit-slider-thumb
		-webkit-appearance: none
		height: 25px
		width: 25px
		border-radius: 50%
		border: none
		cursor: pointer
		background: linear-gradient(145deg, #23282c, #1e2125)
		box-shadow: 5px 5px 8px var(--boxShadowDark), -2px -5px 10px var(--boxShadowLight)
	input[type=range]:focus
		outline: none
	input[type=range]::-ms-track
	&__size-content
		display: flex
	&__size-item
		width: 100%
		margin: 0rem 1rem
		padding: 2rem
		position: relative
		border: .3rem solid var(--mainDark)
		border-radius: 8px
		input[type=radio]
			position: absolute
			width: 100%
			height: 100%
			opacity: 0
		label
			position: absolute
			display: flex
			justify-content: center
			align-items: center
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			width: 100%
			height: 100%
			font-size: 2rem
			color: var(--mainGrey)
			font-weight: 800
	&__stress
		.switch
			position: relative
			display: inline-block
			width: 60px
			height: 34px
		.switch input
			opacity: 0
			width: 0
			height: 0
		.slider
			position: absolute
			cursor: pointer
			top: 0
			left: 0
			right: 0
			bottom: 0
			background: linear-gradient(145deg, #1e2125, #23282c)
			box-shadow: inset 0px 15px 20px var(--boxShadowDark), inset 0px -5px 30px var(--boxShadowLight), 5px 5px 10px var(--boxShadowDark), -5px -5px 10px var(--boxShadowLight)
			-webkit-transition: .4s
			transition: .4s
		.slider:before
			position: absolute
			content: ""
			height: 26px
			width: 26px
			left: 4px
			bottom: 4px
			background: linear-gradient(145deg, #23282c, #1e2125)
			box-shadow: 5px 5px 8px var(--boxShadowDark), -2px -5px 10px var(--boxShadowLight)
			-webkit-transition: .4s
			transition: .4s
		input:checked + .slider:before
			-webkit-transform: translateX(26px)
			-ms-transform: translateX(26px)
			transform: translateX(26px)
		.slider.round
			border-radius: 34px
			&:before
				border-radius: 50%
	&__btn
		position: fixed
		bottom: 10%
		right: 10%
		button
			padding: 1rem 3rem
			border-radius: 10px
			color: var(--mainGrey)
			text-transform: uppercase
			font-weight: 800
</style>