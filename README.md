# Web-Development-Basics

## STYLING the BASIC Vanilla JS Calculator / TASKS

1.  Add classes to the created DOM nodes so we can apply css styling to them through css class syntax `.[classname] {}`

    - Add a class to the calculator `calculator.className = "calculator";`
    - Add a class to the display ` display.className = "calculator-display";`
    - Add a class to the displayContainer `displayContainer.className = "calculator-display-container";`

2.  Create a basic style sheet for the app
    - Create a `src/styles.css` file and Add the following content to it
    ```
    body {
      color: black;
      background-color: red;
    }
    ```
    - Try it out using `npm run dev`
      - Notice: no styling has been applied, background og page is not _red_
      - Notice: HTMLTag lvl styling
      - Notice: `color` for font colors
      - Notice: `background-color` for box color - (CSS Box Model)[https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model]
      - Notice: To **see box model in action**, open a website, right click on an element and select the _Inspect_ option, the start going through the html code with your mouse while looking at the page,
    - Delete `/dist` folder, and run `npm run build` to regenerate it
    - Search inside `dist` folder files for css content
      - Notice: No css code has been bundled with the JS
3.  Basic bundling of the stylesheet together with the app

    - Modify `src/template.html` to refer to the stylesheet by adding the following line in its _head_ section: `<link rel="stylesheet" href="styles.css" type="text/css" />`
      - Notice: `<link>` tag - used to refer to stylesheet files most of the time
    - Rerunning `npm build now` will result in `dist/index.html` referring to a file
    - Install the simple lugin called _copy-webpack-plugin_ (which will copy `src/styles.css` to the `/dist` folder): `npm install -D copy-webpack-plugin`
      - Check for a successful install (it appears in `package.json` and `node_modules`)
    - Configure the new plugin in the frontend compilers config file, `webpack.config.js`, by adding the following to the _plugins_ object

    ```
        new CopyPlugin({
          patterns: [{ from: "**/*.css", context: "src" }],
        }),
    ```

    - Dont forget to import the CopyPlugin class with `const CopyPlugin = require("copy-webpack-plugin");`
    - Rerun `npm run build` and check if `styles.css` is copied to dist folder
    - Run `npm run dev` and check if `styles.css` is applied

4.  Styling the app

    - Open `src/styles.css` for editing
    - Remove the awful red coloring of the page, change it `whitesmoke`
      - Notice: it Dev Server is running, you will have to refresh page when editing stylesheet
    - Add styling to the main container, `calculator` through its class (please have the dev server running)

    ```
    .calculator {
      margin: 20px auto;
      padding: 20px;
      max-width: 400px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    ```

    - Try it out by refreshing the page

      - Notice: App is centralised horizontally on page by `margin 20px auto` (shorthand for `margin-top: 20px`, `margin-bottom: 20px`, `margin-right: auto` and `margin-left: auto`)
      - Notice: Calculator container has a white background (`background-color: white;`) and stick out of page with a styling trick `box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);`
      - Notice: Calculator box is rounded by `border-radius: 5px;`
      - Notice: Margin is border area (repr. by a number) that separates the box from neighbouring boxes
      - Notice: Padding is border area (repr. by a number) that separates the box from inner / child boxes (`padding: 20px` is a shorthand and applies padding border area to left, top, bottom and right of the box, going inwards)
      - Notice: css syntax heavily refers its box model (padding, margin, box-shadow, box width / height, box border...)

    - Add styling to the display and refresh the app

    ```
    .calculator-display-container {
       margin: 10px auto;
       padding: 10px;
       background-color: whitesmoke;
       border-radius: 5px;
    }

    .calculator-display {
       margin: 10px auto;
    }
    ```

5.  Order the buttons in the box with css. For this we should separate the buttons with a container

    - Add a container for the buttons by modifying createCalculator function in `src/App.js`

    ```
      const calculatorButtonContainer = document.createElement("div");
      calculatorButtonContainer.className = "calculator-buttons";

      const display = CreateDisplay(calculator);
      calculator.appendChild(calculatorButtonContainer);
    ```

    - Make sure buttons are added to this new container instead of the main `calculator` cotainer by modifying the button creation lines to `symbols.push(CreateSymbolButton(calculatorButtonContainer, 0));`
    - Add styling to the button container in `src/styles.css`

    ```
    .calculator-buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      margin: 0 auto;
    }

    ```

    - Reload the page and take a look at an okayishly styled calculator
      - Notice: CSS grid layout with 'display: grid'
    - Change font color of the app by modifying the `body`s `color` in `src/styles.css` to `color: green`
      - Notice: Only the displays text changed color - There is a default styling for elements, some will inherit from upper elements, some have to be overwritten manually
      - Add `input { color: green;}` to see this
