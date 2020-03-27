const path = require('path');

module.exports = {
	configureWebpack: {
		entry: {
			'main/index': './src/main/index.js',
			'renderer/index': './src/renderer/index.js'
		},
		target: 'electron-main'
	},
	outputDir: path.join(__dirname, 'dist')
}