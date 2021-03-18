<template lang="pug">
.top-bar 
	.beats-set.main-btn.neuro-outpressed.pointer.blockSelect(
		@click="beatsMenu = !beatsMenu",
		:class="{ activeBeatsMenu: beatsMenu }"
	)
		span {{ curVals.beats }} / {{ curVals.size }}


	.menu.main-btn.neuro-outpressed.pointer.blockSelect(
		@click="menu = !menu",
		:class="{ neuroPressed: menu }"
	) 
		span menu
	transition(name="fade")
		.menu-content(v-show="menu", @click="closeMenu") 
			router-link(to="AddSong") add song
			router-link(to="Songs") songs
			a(v-if="themeDark", @click.stop="CHANGE_THEME") light theme
			a(v-else, @click.stop="CHANGE_THEME") dark theme
			a send feedback
			a about
			.login 
				.login__name {{ login }}
				a(@click="logout") 
					img(src="../assets/img/logout.png")
</template>

<script>
import { mapMutations } from "vuex";

export default {
	data: () => ({
		menu: false,
		beatsMenu: false
	}),
	methods: {
		...mapMutations(["CHANGE_THEME"]),
		closeMenu() {
			setTimeout(() => {
				this.menu = false;
			}, 500);
		},
		async logout() {
			await this.$store.dispatch("logout");
			this.$router.push("/");
		}
	},
	computed: {
		login() {
			return this.$store.state.user;
		},
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
	top: 0%
	left: 0%
	width: 100%
	height: 100%
	background-color: var(--mainBg)
	z-index: 2
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	font-size: 2.5rem
	text-transform: uppercase
	+MW414
		top: -10%
		left: -10%
		width: 120%
		height: 120%
	a
		margin: 1.5rem 0rem
		transition: .4s
		&:hover
			color: var(--akcentLight)
			text-shadow: 0px 0px 25px var(--akcentLight)
			transition: .4s
			cursor: pointer
	.login
		margin-top: 3rem
		color: var(--akcentLight)
		display: flex
		align-items: center
		&__name
			letter-spacing: .3rem
			font-size: 1.4rem
			font-weight: 800
		img
			width: 3rem
			height: 3rem
			margin-left: 1rem
</style>