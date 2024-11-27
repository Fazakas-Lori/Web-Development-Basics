const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const dbInit = require("./db.js");
const db = dbInit();

console.log("SERVER: NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const hotReloader = require("webpack-hot-middleware");

  const configs = require("../../webpack.config.js");
  const frontendConfig = configs.find((config) => config.name === "frontend");
  const frontendCompiler = webpack(frontendConfig);

  // USED TO SERVE STATIC FILES IN DEVELOPMENT
  app.use(
    webpackDevMiddleware(frontendCompiler, {
      publicPath: frontendConfig.output.publicPath,
    })
  );

  // USED TO ENABLE HOT RELOADING OF UI CODES IN DEVELOPMENT
  app.use(
    hotReloader(frontendCompiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000,
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
}

app.use(express.json());

app.get("/api", (req, res) => {
  console.log("GET /api");
  res.send("Hello World!");
});

app.get("/api/calculation", (req, res) => {
  console.log("GET /api/calculation");
  const nums = db.getNums();
  res.json(nums, 200);
});

app.post("/api/calculation", (req, res) => {
  console.log("POST /api/calculation");
  const num = req.body.num;
  db.createNum(num);
  res.sendStatus(201);
});

app.delete("/api/calculation/:id", (req, res) => {
  console.log("DELETE /api/calculation/:id");
  const numId = req.params.id;
  if (db.findNum(numId) !== undefined) {
    db.deleteNum(numId);
    res.sendStatus(204);
  } else {
    jsonErr = { error: "Num not found in DB" };
    res.json(jsonErr, 404);
  }
});

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
