const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/main/index.js',
	output: {
		path: path.join(__dirname, 'dist/main'),
		filename: 'main.bundle.js'
	},
	target: 'electron-main',
	node: {
		__filename: false,
		__dirname: false
	}
}