<template lang="pug">
.top-bar 
	.beats-set.main-btn.neuro-outpressed.pointer.blockSelect(
		@click.capture="beatsMenu = true"
	)
		span {{ currentSong.beats }} / {{ currentSong.size }}
		.beats-set__content(v-if="beatsMenu") 
			BeatsMenu(@closeBeatsMenu="beatsMenu = false")

	.menu.main-btn.neuro-outpressed.pointer.blockSelect(
		@click="menu = !menu",
		:class="{ neuroPressed: menu }"
	) 
		span menu
	transition(name="fade")
		.menu-content(v-show="menu", @click="closeMenu") 
			.userName {{ user }}
			router-link(v-show="user.length > 0", to="AddSong") add song
			router-link(v-show="user.length > 0", to="Songs") songs
			a(v-if="themeDark", @click.stop="changeTheme") light theme
			a(v-else, @click.stop="changeTheme") dark theme
			a(href="https://www.facebook.com/erlan.zharkeev/") send feedback
			router-link(to="About") about
			.logOut.pointer(v-if="user.length > 0", @click="logout") 
				span logout
				img(src="../assets/img/logout.png")
			router-link#authorize(v-else, to="/authType") authorize &crarr;
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BeatsMenu from "../components/BeatsMenu";

export default {
	components: {
		BeatsMenu
	},
	data: () => ({
		menu: false,
		beatsMenu: false
	}),
	methods: {
		...mapActions(["updateTheme"]),
		...mapMutations(["CHANGE_THEME", "RESET_STORE", "UPDATE_THEME"]),
		changeTheme() {
			this.CHANGE_THEME();
			this.UPDATE_THEME();
		},
		closeMenu() {
			setTimeout(() => {
				this.menu = false;
			}, 500);
		},
		async logout() {
			await this.$store.dispatch("logout");
			this.$router.push("/authType");
			const resetStore = {
				info: {
					user: "",
					infoMessage: ''
				},
				currentSong: {
					id: "2cccccccc",
					author: "RadioHead",
					title: "Creep",
					bpm: 92,
					beats: "4",
					size: "4",
					sFirstBeat: true
				}
			};
			this.RESET_STORE(resetStore);
		}
	},
	mounted() {},
	computed: {
		...mapGetters(["user", "themeDark", "currentSong", "infoMessage"])
	}
};
</script>

<style lang="sass" scoped>
.top-bar
	width: 100%
	height: 8%
	display: flex
	justify-content: space-between
	.beats-set
		font-size: 1.5rem
		font-weight: 800
		&__content
			display: flex
			align-items: center
			background-color: var(--mainBg)
			position: fixed
			width: 100%
			height: 100%
			top: 0%
			left: 0%
			z-index: 4
			padding: 0rem 4rem
			+MW500
				padding: 0rem
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
	.userName
		margin-bottom: 4rem
		color: var(--akcentLight)
	.logOut
		display: flex
		align-items: center
		color: var(--akcentLight)
		margin-top: 4rem
		span
			font-size: 1.4rem
			font-weight: 800
		img
			width: 2rem
			height: 2rem
			margin-left: 1rem
	#authorize
		color: var(--akcentLight)
		margin-top: 4rem
		font-size: 1.8rem
		font-weight: 800
</style>