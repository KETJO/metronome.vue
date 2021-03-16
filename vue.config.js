module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? './metronome/'
    : '/',
	css: {
		loaderOptions: {
		sass: {
			additionalData: `@import "~@/assets/styles/sass/style.sass"`
		},
	},
}
}
