# Web-Development-Basics

## State

- Javascript Module usage
- Restructured App

## Initial Problem

- Module error loading still persists, there is no server component and/OR js is not bundled into a single file

## Bundling **JS Modules** into a **Single JS file** / Tasks

1. Transform app into a package: `npm init -y`

   - Notice: package.json appears in `[root]` folder
     - package.json is necessary for installing other packages, like bundlers, transpilers, etc...
   - installed packages will appear inside a new folder under root: `[root]/node_modules`

2. Use/Install webpack module bundler package: `npm install -D webpack webpack-cli`
   - Notice `webpack` and `webpack-cli` in `package.json/scripts`
3. Modify `package.json/scripts` to

   ```
   "scripts": {
     "build": "webpack --mode production"
   }
   ```

4. Run bundler and check results
   - `npm run build`
   - Notice: `npm run [script_name]`
   - Notice: `main.js` appears in `dist` folder
   - Notice: `main.js` is now a fully bundled JS file - **it is NOT in module form**
5. Change reference to script in index.html
   - `<script src="../src/index.js"></script>` to `<script src="./main.js"></script>`
   - Load the new html file in a browser, it should work correctly
6. Rename index.js to any other name and build the app
   - Notice: Build error
   - Revert renamig

## New Features

- App is now a package, can be distributed
- App can use npm packages (npm_modules folder)
- App/BL can be structured around JS modules

## Ending Problems

- Dist Folder committed and not generated
- index.html script reference changes
- Cant Rename index.js
- Constant Rebuilding and Refreshing app in browser
