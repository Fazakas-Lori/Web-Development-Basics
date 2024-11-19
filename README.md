# Web-Development-Basics

## Styling the App with Tailwind / TASKS

1.  Install necessary packages
    `npm install -D css-loader postcss postcss-loader postcss-preset-env style-loader tailwindcss`

    - Note: Running order is _webpack_ -> _postcss-loader_-> _postcss_ -> _tailwindcss_ -> _postcss-reset-env_ -> _css-loader_ -> _style-loader_
    - Explanation: _postcss-loader_ is the webpack loader that calls _postcss_ (by default)
    - Explanation: _postcss_ css transpiler engine for calling css transpilers as plugins
    - Explanation: _tailwindcss_ is a _postcss_ plugin, the css-feature rich css lib we will be using. Returns modern css syntax
    - Explanation: _postcss-preset-env_ is a _postcss_ plugin, converts modern CSS to compatible css
    - Explanation: _css-loader_ interprets `import [cssFilePath]` statements, returns `require [statement]`
    - Explanation: _style-loader_ injects css into js according to `require [statement]`

2.  Uninstall the old copy webpack plugin, we will not needed it, and remove its usage from `webpack.config.js`
3.  Modify `webpack.config.js` to use the tailwind transpilation process, adding a new module rules object
    ```
    {
      test: /\.(css)$/i,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
    ```
    - Note: [loaders run from right to left](https://webpack.js.org/concepts/loaders/#configuration)
4.  Create a new file called `[root]/postcss.config.js` with the following content

    ```
      const tailwindcss = require("tailwindcss");
      module.exports = {
      plugins: ["postcss-preset-env", tailwindcss],
    };
    ```

    - Explanation: _tailwindcss_ transpiles tailwind syntax and returns modern css syntax
    - Explanation: _postcss-preset-env_ transpiles modern css syntax and returns compatible CSS syntax

5.  Create a new file called `[root]/tailwind.config.js` with the following content

    ```
    module.exports = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

    - Explanation: `content: ["./src/**/*.{js,jsx,ts,tsx}"]` goes through files and transpiles tailwind syntax in them

6.  Import the css file [as a module](https://webpack.js.org/concepts/loaders/#inline) in `src/index.js`: `import "./styles.css";`
7.  Delete the hard-coded reference to the stylesheet from `src/template.html`
    - ~~`<link rel="stylesheet" href="styles.css" type="text/css" />`~~
8.  Edit `src/style.css` to use the new tailwind syntax

    ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer components {
      .calculator {
        @apply mx-auto my-5 p-5 max-w-sm bg-white rounded-md shadow-lg;
      }

      .calculator-display-container {
        @apply mx-auto my-2 p-2 bg-neutral-100 rounded-md;
      }

      .calculator-display {
        @apply mx-auto my-2;
      }

      .calculator-buttons {
        @apply grid grid-cols-4 gap-2 mx-auto my-0 bg-white;
      }

      .calculator-button {
        @apply p-1 bg-white rounded-md shadow-md;
      }

      .calculator-button:active {
        @apply bg-neutral-100 shadow-md transform translate-y-1;
      }
    }

    body {
      color: black;
      background-color: whitesmoke;
    }

    input {
      padding: 0;
    }

    h1 {
      background-color: #333;
      color: #fff;
      margin: 0;
      padding: 10px;
      text-align: center;
    }

    ```

    - Notice: Tailwind syntax using [custom components](https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes)
    - Notice: `margin: 20px auto` is now broken up into tailwind syntaxes: `my-5` + `mx-auto` - [link to tailwind margin](https://tailwindcss.com/docs/margin)
    - Notice: `max-width` is now `max-w-sm`
    - Notice: `background: white` is now `bg-white`
    - Notice: `border-radius: 5px;` is now `rounded-md`
    - Notice: `box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);` is now `shadow-lg`
    - Notice: `display: grid` is now `grid`
    - Notice: tailwind/css [_pseudo-class_](https://developer.mozilla.org/en-US/docs/Web/CSS/:active): `.calculator-button:active`
