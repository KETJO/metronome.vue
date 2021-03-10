<template lang="pug">
.top-bar 
	.beats-set.main-btn.neuro-outpressed.pointer.blockSelect(
		@click="$router.push({ name: 'BeatsMenu' })"
	)
		span {{ curVals.beats }} / {{ curVals.size }}
	.menu.main-btn.neuro-outpressed.pointer.blockSelect(
		@click="menu = !menu",
		:class="{ neuroPressed: menu }"
	) 
		span menu
	transition(name="fade")
		.menu-content(v-show="menu", @click="closeMenu") 
			a sounds
			router-link(to="Songs") songs
			a vusual mode
			a(v-if="themeDark", @click="CHANGE_THEME") light theme
			a(v-else, @click="CHANGE_THEME") dark theme
			a send feedback
			a about
</template>

<script>
import { mapMutations } from "vuex";
export default {
	data: () => ({
		menu: false
	}),
	methods: {
		...mapMutations(["CHANGE_THEME"]),
		closeMenu() {
			setTimeout(() => {
				this.menu = false;
			}, 500);
		}
	},
	computed: {
		themeDark() {
			return this.$store.state.themeDark;
		},
		curVals() {
			return this.$store.state.currentSong;
		}
	},
	mounted() {}
};
</script>

<style lang="sass" scoped>
.top-bar
	width: 100%
	display: flex
	justify-content: space-between
	.beats-set
		font-size: 1.5rem
		font-weight: 800
.menu
	z-index: 3
.menu-content
	position: absolute
	top: -10%
	left: -10%
	width: 120%
	height: 120%
	background-color: var(--mainBg)
	z-index: 2
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	font-size: 2.5rem
	text-transform: uppercase
	a
		margin: 1.5rem 0rem
		transition: .4s
		&:hover
			color: var(--akcentLight)
			text-shadow: 0px 0px 25px var(--akcentLight)
			transition: .4s
			cursor: pointer
</style>