# Web-Development-Basics

## Creating a BASIC Vanilla JS Calculator / TASKS

1. Cleaning UP Sources - Remove all REACT associated codes so repository will be in a REACT-free state

   - Remove packages react, react-dom by running `npm uninstall react react-dom`
   - Remove the react transpiler by running `npm uninstall @babel/preset-react`
   - Remove the react transpiler usage from webpack.config.js. `babel-loader` options should look like

   ```
    options: {
      presets: ["@babel/preset-env"],
    },
   ```

   - Delete unnecessary JS module files
     - module1.js
     - Profile.js
   - Delete the errouneously commited files `dist/favicon.ico` and `dist/index.html` by deleting `dist` folder
   - Modify App.js module to export a single, empty `CreateCalculator` function

   ```
   const CreateCalculator = () => {};
   export { CreateCalculator };
   ```

   - Modify `index.js` by cleaning it of the old code and importing only the new `CreateCalculator` function. Its content should look like

   ```
   import { CreateCalculator } from "./App.js";

   document.addEventListener("DOMContentLoaded", () => {
     console.log("DOM is ready");
   });
   ```

   - Run `npm install` packages in `/node_modules` in an optimal state
   - Delete `/dist` folder and run `npm run build` to see if webpack build is still working
   - Test that webpack bundling and serve-ing still works by running `npm run dev`
     - Correct missing title / localhost:9000 title bug by adding the following line to the `head` section of `src/template.html`
     ```
     <title><%= htmlWebpackPlugin.options.title %></title>
     ```
