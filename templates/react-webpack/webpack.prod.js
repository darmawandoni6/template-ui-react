const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    assetModuleFilename: "images/[contenthash][ext]",
    publicPath: "/",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    // optimization: {
    //   runtimeChunk: "single",
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: "vendors",
    //         chunks: "all",
    //       },
    //     },
    //   },
  },
  performance: {
    hints: false,
  },
});
