"use strict";

const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    assetModuleFilename: "images/[name][ext]",
    publicPath: "/",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    compress: true,
    port: 9000,
    liveReload: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "styles/[name].css",
      filename: "styles/[name].[contenthash].css",
    }),
  ],
});
