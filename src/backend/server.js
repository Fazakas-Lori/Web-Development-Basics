const express = require("express");
const app = express();
const PORT = 3000;

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const hotReloader = require("webpack-hot-middleware");
const config = require("../../webpack.config.js");
const compiler = webpack(config);

// USED TO SERVE STATIC FILES IN DEVELOPMENT
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist/public"));
} else {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );
}

if (process.env.NODE_ENV === "development") {
  app.use(
    hotReloader(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );
}

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
