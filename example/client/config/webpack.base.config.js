const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const genericNames = require("generic-names");
const generate = genericNames("[local]__[hash:base64:5]", {
  context: process.cwd()
});
const generateScopedName = (localName, filePath) => {
  var relativePath = path.relative(process.cwd(), filePath);
  return generate(localName, relativePath);
};

const $root = path.resolve(__dirname, "..");

module.exports = {
  entry: path.resolve($root, "src/index.js"),
  output: {
    path: path.resolve($root, "dist"),
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-env",
                  {
                    corejs: 3,
                    useBuiltIns: "usage"
                  }
                ]
              ],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-runtime",
                [
                  "react-css-modules",
                  {
                    webpackHotModuleReloading: true,
                    autoResolveMultipleImports: true,
                    generateScopedName: "[local]__[hash:base64:5]",
                    filetypes: {
                      ".less": {
                        syntax: "postcss-less"
                      }
                    }
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
                getLocalIdent: (context, localIdentName, localName) => {
                  return generateScopedName(localName, context.resourcePath);
                }
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"]
              }
            }
          },
          { loader: "less-loader" }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "GraphQL & React",
      template: path.resolve($root, "public/index.html")
    })
  ],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        react: {
          name: "vendor",
          test: /[\\/]node_modules\/]/,
          chunks: "all"
        },
        default: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  }
};
