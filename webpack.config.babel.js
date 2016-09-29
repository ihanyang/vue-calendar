import path from "path"
import precss from "precss"
import autoprefixer from "autoprefixer"

module.exports = {
	entry: {
		app: "./src/app.js",
		vendors: ["vue"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
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
		postcss: [precss]
	},
	devtool: "source-map"
}