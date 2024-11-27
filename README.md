# Web-Development-Basics

## MODIFYING BUILD PROCESS TO OUTPUT PRODUCTION PACKAGE / TASKS

1.  Modify webpack bundler so it bundles backend codes

    - In `webpack.config.js` `module.exports` object should export an array of configurations `[]` rather than a single object, modify it accordingly
    - Add a new exported configuration to the array

    ```
        {
          name: "backend",
          target: "node",
          mode: "process.env.NODE_ENV",
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
    ```

    - Notice the following
      - config object has a `name`
      - config object has a `target`, its type is `node`. This refers to the environment [target](https://webpack.js.org/configuration/target/) the codes will run in.
      - output path is not `dist` only, ommitting backend part. We will need this structure later on, when we deploy, as Azure cloud containers (when starting a web app automatically) look for startable files in the root directory by default
      - output name is `server.js` as this is one of the files Azure cloud provider will Start by default with the `node` command
      - the _CopyPlugin_ usage. We will need the `package.json` in the output, as the cloud container will install `node_modules` folder.
        - Dont forget to install it with: `npm install -D copy-webpack-plugin`
        - _Import_ it at the top of the file with `const CopyPlugin = require("copy-webpack-plugin");`
      - _nodeExternals_ usage. We dont want bundler to try and bundle all codes from node_modules (it cant really do that, as requires are used with dynamic import syntax, decided at runtime).
        - Install the package with: `npm install -D webpack-node-externals`
        - Import the package with:`const nodeExternals = require("webpack-node-externals");`
    - Modify the first config object, giving it a name and target type (even if by default it is web)
    - We will not need the hot module replacement entry in production so
      - create a variable named frontendEntries before the exports: `var frontendEntries = ["./src/frontend/index.js"];`
      - if we are in development mode, add hot module entry into entries `if (process.env.NODE_ENV === "development") frontendEntries.push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true");`
      - modify `frontend` config objects entry object so its value depends on the previously created `frontendEntries` object: `entry: { bundle: frontendEntries },`
    - Modify the `mode: "development"` on the `frontend` config object, to `mode: "process.env.NODE_ENV",` so `npm run dev` can supply mode correctly to _webpack_ and _webpack dev middleware_

2.  Modify package.json to create a prod build
    - In `package.json`s modify `scripts` object to the following
    ```
    "scripts": {
      "build": "cross-env NODE_ENV=development webpack",
      "build-prod": "cross-env NODE_ENV=production webpack",
      "dev": "npm run build && cross-env NODE_ENV=development node dist/server.js",
      "prod": "npm run build-prod && cross-env NODE_ENV=production node dist/server.js"
    },
    ```
    - Notice the following:
      - NODE_ENV setting in each build type
      - prod builds and runs
3.  Modify `backend/server.js` for production mode

    - PORT should not be hard coded, but instead it should be set by an env var
      - necessary because containers try to ping the web app through the port they set for it. If the app does not respond, the container will shut down
      - modify PORT: `const PORT = process.env.PORT || 3000;`
    - _hot module replacement_ and _webpack dev middleware_ are only `require`(d) in development mode so put the _require statements_ and their _middlewares_ in an if statement

    ```
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
    ```

    - Notice:
      - _frontendConfig_ and _frontendCompiler_ selected from webpack exports as hot module is only set for them
    - Static file serving is required in production mode so put that in an if statement as well

    ```
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(__dirname + "/public"));
    }
    ```

    - Check that hot reload is still working by running `npm run dev` and then changing the main greeting message in `src/frontend/App.js` to "Hello Web Dev 5!"
    - _db require_, _dbInit_ and *express*s _json_ middleware is not environment dependent, so it should be outside any `if` statements
    - Try a build and see if `dist` folder is populated accordingly
      - `npm run build`
      - `npm run build-prod`
      - Notice: The build output is split into two parts: `frontend` and `backend`
    - Try if dev end and hot realoading still works with `npm run dev`
    - Try running the prod version with `npm run prod`

4.  CONGRATULATIONS! YOU HAVE JUST CREATED A STARTING DEV AND PROD ENVIRONMENT
5.  Further challenges
    - Hot Reload for server component
