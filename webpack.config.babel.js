import path from "path"
import precss from "precss"
import webpack from "webpack"
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
	plugins: [new webpack.optimize.CommonsChunkPlugin("common.js", ["app", "vendors"])],
	devtool: "source-map"
}