const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

var frontendEntries = ["./src/frontend/index.js"];
console.log("WEBPACK: NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") frontendEntries.push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true");

module.exports = [
  {
    name: "frontend",
    target: "web",
    mode: process.env.NODE_ENV,
    entry: { bundle: frontendEntries },
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
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          ],
        },
      ],
    },
  },
  {
    name: "backend",
    target: "node",
    mode: process.env.NODE_ENV,
    entry: ["./src/backend/server.js"],
    externals: [nodeExternals()],
    output: {
      path: __dirname + "/dist",
      filename: "server.js",
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: "package.json", context: "./" }],
      }),
    ],
  },
];
