const path = require("path");
const webpackBaseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");

const $root = path.resolve(__dirname, "..");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join($root, "dist"),
    compress: true,
    hot: true,
    open: true,
    port: 4000
  }
});
