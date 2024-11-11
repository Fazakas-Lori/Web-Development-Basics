# Web-Development-Basics

## State

-
-

## Initial Problem

- UI is still pretty static, template is used but it is still coded in HTML

## Moving from HTML UI coding to JS-based UI coding with REACT / Tasks

1. Install REACT UI library
   - run `npm install react react-dom`
     - Notice: in `package.json` REACT and REACT-DOM appeared as a dependencies under `dependencies` object
   -
2. Connect `index.js` to REACT lib

   - modify code of `index.js` to the following:

   ```
   import { createRoot } from "react-dom/client";
   import { App } from "./App";

   // Render your React component in the root element
   const root = createRoot(document.getElementById("app"));
   root.render(<App />);
   ```

   - Read the code and understand it
     - Notice: React module usage
     - Notice: Finding and rendering REACT app dynamically in a _root_ tag in the html file
     - Notice: Root UI component appears with REACT syntax: `<App />`

3. Create App component

   - in `/src` folder create a file called `App.js`
   - Content of `App.js` should be

   ```
   const App = () => {
   return <h1>{"Hello, REACT!"}</h1>;
   };

   export { App };
   ```

   - Run `npm run build` command
     - Notice: webpack build gives an error for an unexpected token. It suggests we use a loader

4. Lets do that. Lets use Babel Loader within Webpack build process
   - Run `npm install -D @babel/core babel-loader`
     - Explanation: `@babel/core` is the main transpiler framework. `bable-loader` is the webpack loader
   - Run `npm install -D @babel/preset-env @babel/preset-react`
     - Explanation: Presets are concrete transpilers.
       `@babel/preset-env` is a transpiler that converts JS to ES5 JS syntax
       `@babel/preset-react` is a transpiler that converts REACT syntax to JS syntax
   - Modify `webpack.config.js` to use the newly installed babel-loader and its presets. Under `devServer` object add the following
   ```
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
    ],
   },
   ```
5. Readd your old JS code to `App.js`, so its code should now look something like the following

```
import { generateText } from "./module1.js";

const App = () => {
  return (
    <>
      <h1>{generateText("Hello, Web Dev2!")}</h1>
      <h1>{generateText("Hello, REACT!")}</h1>
    </>
  );
};

export { App };

```

6. Try out the full build/compilation process

   - run `npm run build`
   - run `npm run dev` for a full font-end-dev experience

7. Cry a little, but just a little
   - open the bundled js file, `bundle.js`, in `dist` folder, and marvel at its size and content now

## New Features

- App UI can be coded by using a JS-based UI library, REACT
- (Almost) Full Frontend Compilation process
  - UI library syntax is converted to JS by a transpiler, Babel
  - Cross browser functionality ensured by a transpiler, Babel
