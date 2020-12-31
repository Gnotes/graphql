const webpackBaseConfig = require("./webpack.base.config");
const merge = require("webpack-merge");

module.exports = merge(webpackBaseConfig, {
  mode: "production"
});
