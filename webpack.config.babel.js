import path from "path"
import precss from "precss"
import autoprefixer from "autoprefixer"

module.exports = {
	entry: "./demo/app.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "app.js",
		publicPath: "/dist/"
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: "vue"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
				test: /\.css$/,
				loader: "style!css"
			}
		]
	},
	vue: {
		postcss: [precss, autoprefixer({
			browsers: "last 2 versions"
		})]
	},
	postcss: [
		precss,
		autoprefixer({
			browsers: "last 2 versions"
		})
	],
	devtool: "source-map"
}