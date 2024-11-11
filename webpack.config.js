const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: { bundle: "./src/index.js" },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack App, YEY!",
      favicon: "./src/favicon.ico",
      filename: "index.html",
      template: "./src/template.html",
    }),
  ],
  devServer: {
    static: {
      directory: __dirname + "/dist",
    },
    port: 9000,
    open: true,
    hot: true,
  },
};
