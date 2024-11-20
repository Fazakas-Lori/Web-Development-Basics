# Web-Development-Basics

## ADDING A BASIC API & STATIC FILE SERVER TO THE PROJECT / TASKS

0. Delete `module1.js` and `Profile.js`, leftovers... and start by modifying `src/frontend/App.js`'s greeting to _Hello Web Dev 4_
1. Install Express server as a dependency `npm install express`
2. Create a small server app

   - by creating a backend folder and server.js inside `src/backend/server.js`
   - by apping the following content to it

   ```
   const express = require("express");
   const app = express();
   const PORT = 3000;

   app.get("/", (req, res) => {
     res.send("Hello World!");
   });

   app.listen(PORT, (err) => {
     if (err) console.log("Error in server setup");
     console.log("Server listening on Port", PORT);
   });
   ```

   - Try it out by running `node /src/backend/server.js` then opening _http://localhost:3000_ in a browser
     - Notice: App is returning a _text_ content, and the browser just shows it. Inspect it with Chromes Dev tools
     - Notice: `app.listen`
     - Notice: `PORT`
     - Notice: `app.get("/")` GET REST Verb

3. Reorganise the frontend codes

   - Create a `src/frontend` folder and move all front end related codes there (6 files)
   - Reconfigure webpack and related files so build will still work
     - Modify `tailwind.config.js`'s content to include _frontend_ folder: `content: ["./src/frontend/**/*.{js,jsx,ts,tsx}"],`
     - Modify `webpack.config.js` to include _frontend_ folder where applicable (3 places)
     - Delete dist dir and rerun `npm run build` and `npm run dev`

4. Prepare frontend file for static serving

   - Modify `webpack.config.js`'s bundler so it outputs frontend files to dist/public
   - Modify `webpack.config.js`'s dev server so it serves frontend files from dist/public
   - Delete dist dir and rerun `npm run build`

5. We dont need a dev server serving files and a separate api server, so kill webpacks dev server. We will be serving static files from _our own Express server_

   - Run `npm uninstall webpack-dev-server`
   - Install the following packages that will help us with hot reloading UI content: `npm install -D webpack-dev-middleware webpack-hot-middleware`
     - Explanation: _webpack-dev-middleware_ is a middleware tool
     - Explanation: _webpack-hot-middleware_ is a
   - Configure webpack to use the _hot-middleware_
     - Modify the entry object to the following: `entry: { bundle: ["./src/frontend/index.js", "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true"] },`
     - This way anything that is bundled from index.js will be refreshed, bundling codes together with a hot-reloader
   - Delete the devServer object
   - Add the _HotModuleReplacementPlugin_ as a plugin, but dont forget to import the webpack object first: `const webpack = require("webpack");`

   ```
     plugins: [
      new HTMLWebpackPlugin({
        title: "Webpack App, YEY!",
        favicon: "./src/favicon.ico",
        favicon: "./src/frontend/favicon.ico",
        filename: "index.html",
        template: "./src/template.html",
        template: "./src/frontend/template.html",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
   ```

   - Modify webpack output object so its publicPath is set

   ```
    output: {
      path: __dirname + "/dist/public",
      filename: "[name].js",
      publicPath: "/",
    },
   ```

   - Modify `backend/server.js` to serve public / static files and use the hot reload module

     - Import the required modules

     ```
     const webpack = require("webpack");
     const webpackDevMiddleware = require("webpack-dev-middleware");
     const hotReloader = require("webpack-hot-middleware");
     ```

     - Get the webpack config object with:

     ```
     const config = require("../../webpack.config.js");
     const compiler = webpack(config);
     ```

     - Serve static files with the following middleware

     ```
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
     ```

   - Add the hot module replacement middleware as well after it

   ```
   if (process.env.NODE_ENV === "development") {
     app.use(
       hotReloader(compiler, {
         log: console.log,
         path: "/__webpack_hmr",
         heartbeat: 10 * 1000,
       })
     );
   }
   ```

   - Modify `package.json` so _npm run dev_ will start the server
     - we will need to set NODE*ENV to \_development* in a cross-platform way, so install _cross-env_ package: `npm install -D cross-env`
     - modify scripts object to
     ```
     "scripts": {
       "build": "webpack",
       "dev": "npm run build && cross-env NODE_ENV=development node src/backend/server.js"
     },
     ```
   - Test the configuration by running `npm run build` and `npm run dev` then opening _http://localhost:3000_ in a browser
     - Notice: We lost our api endpoint because middleware is catching it and handling the request. So modify API endpoint to `app.get("/api"...`
