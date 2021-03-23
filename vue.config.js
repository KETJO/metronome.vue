module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/metronome/'
    : '/',
	filenameHashing: false,
	css: {
		sourceMap: true,
		loaderOptions: {
		sass: {
			additionalData: `@import "~@/assets/styles/sass/style.sass"`
		},
	},
	
}
}
