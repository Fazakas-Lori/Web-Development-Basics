const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: { bundle: ["./src/frontend/index.js", "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true"] },
  output: {
    path: __dirname + "/dist/public",
    filename: "[name].js",
    publicPath: "/",
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack App, YEY!",
      favicon: "./src/frontend/favicon.ico",
      filename: "index.html",
      template: "./src/frontend/template.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
          },
        },
      },
      {
        test: /\.(css)$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
