const webpack = require("webpack");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./app-bundle.js"
  },
  module: {
    rules: [
    	{
			test: /\.js|jsx$/,
			exclude: /node_modules/,
			use: { loader: "babel-loader" }
    	},
    	{
			test: /\.(sass|scss)$/,
			use: [
			{ 
				loader: MiniCssExtractPlugin.loader
			},
			{
			    loader: "css-loader" // translates CSS into CommonJS
			}, 
			{
			    loader: "sass-loader" // compiles Sass to CSS
			}
			]
		}
    ]
  },
  plugins: [
  	new HtmlWebpackPlugin({
          template: __dirname + "/src/index.html",
          inject: 'body'
    }),
	new MiniCssExtractPlugin({
	  filename: "app.css",
	  chunkFilename: "[id].css"
	}),
	new DashboardPlugin()
  ],
	devServer: {
	  contentBase: path.resolve(__dirname, "./dist"),
	  historyApiFallback: true,
	  inline: true,
	  open: true,
	  hot: true
	},
	devtool: "eval-source-map"
}
