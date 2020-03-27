const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: './src/renderer/index.js',
	output: {
		path: path.join(__dirname, 'dist/renderer'),
		filename: 'renderer.bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.styl/,
			loader: "style-loader!css-loader!stylus-loader",
		}, {
			test: /\.ts$/,
			use: 'ts-loader'
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			use: "url-loader"
		}, {
			test: /\.node$/,
			loader: 'electron-node-loader',
			options: {
				folder: 'renderer/addon'
			}
		}, {
			test: /\.svg$/,
			use: {
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]',
					outputPath: 'dist/renderer/' //输出路径
				}
			}
		}]
	},
	target: 'electron-renderer',
	mode: 'production',
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.vue', '.css', '.less', '.styl'],
		alias: {
			'vue$': 'vue/dist/vue.js',
			'renderer$': path.join(__dirname, './src/renderer'),
			'main$': path.join(__dirname, 'src/main'),
			'assets$': path.join(__dirname, 'src/assets')
		},
		modules: ['node_modules'],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/renderer/index.html'
		}),
		new CopyWebpackPlugin([{
			from: 'src/renderer/assets',
			to: 'assets'
		}, {
			from: 'src/renderer/redox_proxy.node',
			to: 'redox_proxy.node'
		}])
	],
	node: {
		__filename: false,
		__dirname: false
	}
}