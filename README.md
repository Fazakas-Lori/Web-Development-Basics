# Web-Development-Basics

## State

- Javascript Module usage
- Restructured App

## Initial Problem

- Module error loading still persists, there is no server component and/OR js is not bundled into a single file

## Creating a full **JS Module-Based Development Experience** / Tasks

1. Create a Configuring File

   - create a webpack.config.js file under `[root]` folder
     - Notice: This file [should](https://webpack.js.org/configuration/configuration-languages/) have CommonJS syntax
     - basic syntax is
     ```
     module.exports = {}
     ```

2. Configure Webpack `mode`, `entry` and `output`

   - modify config file to

   ```
   module.exports = {
     mode: "development",
     entry: { bundle: "./src/index.js" },
     output: {
       path: __dirname + "/dist",
       filename: "[name].js",
     },
   }
   ```

   - Read and understand config file modifications
     - Notice: entry file and folder as well output file and folder is given now => we can change these however we want
     - Notice: output name changed to `bundle.js` (`entry` object)
     - Notice: mode changed to `development` => generated `bundle.js` has a lot of plus code
   - delete the trailing `--mode production` in package.json
   - run the `npm run build` command
     - Notice: build now reads config file
   - change the script reference from `./main.js` to `./bundle.js` in `index.html`
   - check in browser to see that building blocks still work ok

3. Adding Html Plugin

   - run the command `npm install -D html-webpack-plugin`
     - Notice: `html-webpack-plugin` appears in `package.json` under `devDependencies`
   - in `webpack.config.js` modify file to use new plugin

     - import the module at the top of the file: `const HTMLWebpackPlugin = require("html-webpack-plugin");`
     - under `output` object, add a new, `plugins` object

     ```
     plugins: [
     new HTMLWebpackPlugin({
      title: "Webpack App, YEY!",
      favicon: "./src/favicon.ico",
      filename: "index.html",
     }),
     ],

     ```

- read and understand the plugin objects
  - Multiple webpack plugins possible `[]`
  - can customize `title`,`favicon` as well as output `file` name through HtmlWebpackPlugin
- move file `favicon.ico` from `dist` to `src`
- run `npm run build` command
  - Notice: favicon.ico (resource) is copied to output folder
  - Notice: `index.html` contents changed inside `dist` folder. It does not have a starting template file to build upon
- Add templating
  - In `/src` folder create a `template.html` basic HTML file
  ```
  <!DOCTYPE html>
  <html>
  <head></head>
  <body>
    <div id="app"></div>
  </body>
  </html>
  ```
  - Modify `webpack.config.js / plugins / HTMLWebpackPlugin` object
    - under `filename` add `template: "./src/template.html",`
- delete `dist` folder
- run `npm run build` command
  - Check contents of `dist/index.html`
  - Notice: App still works in browser
- Modify `template.html`, adding a new tag to it, like: `<a href="https://www.google.com">Google</a>`
- run `npm run build` command
  - Notice: Anything you add to template file will be visible on the page => _templating works_

4. Configure Webpack with a development server (_rerunning `npm run build` getting very tiresome_)

   - Modify `webpack.config.js / plugins / HTMLWebpackPlugin` object
   - After `plugins` array, add a new object

   ```
   devServer: {
    static: {
      directory: __dirname + "/dist",
    },
    port: 9000,
    open: true,
    hot: true,
   },

   ```

   - Read and understand the devServer object
     - Notice: Served dir name is configurable by `static: {}` object
     - Notice: Port of dev server configurable by `port: 9000`
     - Notice: hot reloading enabled by `hot: true` option
     - Notice: opening of page now enabled after build by `open: true` option
   - Modify `package.json` so it will start the dev server
     - in `scripts` object, under `build`, add `"dev": "webpack serve"` (comma needed after `build` line)
   - run `npm run dev` command
     - install the `webpack-dev-server` if prompted
     - Notice: server now started on `localhost:9000` and browser opened automatically to this location
   - Try _hot-reload_ feature
     - add `<a href="https://www.yahoo.com">Yahoo</a>` to `template.html` and save
     - modify `module1.js`-s exported functions return value
       - Notice: after saving files, `index.html`, in `localhost:9000` displays the new content

## New Features

- Dist folder content generation
- Html file templating
- Development Server
- Hot Reloading

## Ending Problems

- ???
- App is very baseic
  - Finish the app by
    1. Install and use a node module that can add some flavour to your text generation (e.g. [uuid](https://www.npmjs.com/package/uuid))
    2. Add a `textArea` into the HTML with an id of your choice, using attribute `id`
    3. Add a button and a `click` event handler to it that generates some new, random text upon cliking it and modifies the `textarea` elements value
