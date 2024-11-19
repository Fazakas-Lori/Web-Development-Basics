# Web-Development-Basics

## Rewriting the Calculator App in REACT / TASKS

1. (Re)Install REACT packages and configure transpiling JSX syntax
   - Install the REACT packages by running `npm install react react-dom`
   - Install the babel react transpiler by running `npm install -D @babel/preset-react`
   - Configure presete-react transpiling by modifying `webpack.config.js` loader options to the following
   ```
   options: {
     presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
   },
   ```
   - Try a build
2. Rewrite Vanilla JS codes to REACT syntax

   - Modify `src/index.js`
     - delete all codes, as they are just litter
     - to import the `createRoot` function from react-dom: `import { createRoot } from "react-dom/client";`
     - to import a component name _App_ from `App.js`, instead of a vanilla JS function: `import { App } from "./App.js";`
     - to create the REACT root component: `const root = createRoot(document.getElementById("app"));`
     - to render the imported _App_ component: `root.render(<App />);`
   - Try the build now
     - Notice: We get a warning stating that no _App_ is exported from `App.js`
   - Modify `src/App.js`
     - by deleting the old export ~~`export { CreateCalculator };`~~
     - to define an empty _App_ component with
     ```
     const App = () => {
       return (
         <>
           <h1>{"Hello, Web Dev3!"}</h1>
         </>
       );
     };
     ```
     - to export the component with the following `export { App };`
   - Try the build now, it shouldn't have any warnings or errors
   - Move the old logic inside a new component called _Calculator_

     - create a new file, `src/Calculator.js`, this will house a _Calculator_ component
     - delete all of the old code from `src/App.js`
     - export an empty calculator component

     ```
     const Calculator = () => {
       return (
         <>
         </>
       );
     };

     export { Calculator };
     ```

     - modify `App.js` to import and use the _Calculator_ component [code missing intentionally]
     - start using the dev server to see changes instantenously
     - focus on the _return_ statement of the _Calculator_ component. It can export a HTML-like tree structure to create the calculator elem tree, instead of using DOM manipulation syntax. Rewrite it to the following:
       - Notice: Thinking in REACT
       - Notice: Thinking in REACT
       ```
       <>
       <div className="calculator">
        <div className="calculator-display-container">
          <div>
            <span className="calculator-display"></span>
          </div>
        </div>
        <div className="calculator-buttons">
          <input type="button" value="0" />
          <input type="button" value="C" />
          <input type="button" value="X" />
          <input type="button" value="/" />
          <input type="button" value="7" />
          <input type="button" value="8" />
          <input type="button" value="9" />
          <input type="button" value="+" />
          <input type="button" value="4" />
          <input type="button" value="5" />
          <input type="button" value="6" />
          <input type="button" value="-" />
          <input type="button" value="1" />
          <input type="button" value="2" />
          <input type="button" value="3" />
          <input type="button" value="=" />
        </div>
       </div>
       </>
       ```

   - Check the browser after saving the file, the basic structure should appear
   - Import REACTs _useState_ so the component can have state management ``
   - Add the display value to the component, deleting the old code values
     - Notice: using REACTs _useState_ method, which will cause a rerender of the component when setting the value
     ```
     const [displayText, setDisplayText] = useState("0");
     ```
   - Add the display value to the component inside the span `<span className="calculator-display">{displayText}</span>`
     - Notice: JSX syntax _{}_ inside html-like elements
     - Notice: keep tracking Browser / Dev tools + Console for changes
   - Add the _number1_, _number2_ and _operator_ state variables similarly to display

   ```
   const [number1, setNumber1] = useState(0);
   const [number2, setNumber2] = useState(0);
   const [operator, setOperator] = useState(null);
   ```

   - move `handleClick`, `reset`, `calculateOperationResult` and `getNumberToDisplay` inside the component and edit the returned jsx syntax to use the click handler `<input type="button" value="0" onClick={handleClick} />`

     - Notice: if you try to test the app now, it will give a lot of errors. You need to use the new state management functions when setting any variable, so it will trigger a rerendering of the component
     - Notice: Performance vs DX
     - The new functions should look like:

     ```
     const reset = () => {
       setNumber1(0);
       setNumber2(0);
       setOperator(null);
     };

     const calculateOperationResult = () => {
       if (operator === "+") {
         return number1 + number2;
       }
       if (operator === "-") {
         return number1 - number2;
       }
       if (operator === "X") {
         return number1 * number2;
       }
       if (operator === "/") {
         return number1 / number2;
       }
     };

     const getNumberToDisplay = (numberStr) => {
       const number = Number(numberStr);
       let numberToDisplay = undefined;

       if (operator !== null) {
         let newNum2 = number2 * 10 + number;
         setNumber2(newNum2);
         numberToDisplay = newNum2;
       } else {
         let newNum1 = number1 * 10 + number;
         setNumber1(newNum1);
         numberToDisplay = newNum1;
       }

       return numberToDisplay;
     };

     const handleClick = (e) => {
       const symbol = e.target.value;
       console.log(`${symbol} button clicked`);
       // special characters
       if (symbol === "C") {
         setDisplayText("0");
         reset();
       } else if (symbol === "+" || symbol === "-" || symbol === "X" || symbol === "/") {
         let newOpVal = symbol;
         setOperator(newOpVal);
         setDisplayText(newOpVal);
       } else if (symbol === "=") {
         let newNum1 = calculateOperationResult();
         setDisplayText(newNum1);
         reset();
         setNumber1(newNum1);
       }
       // numbers
       else {
         setDisplayText(getNumberToDisplay(symbol));
       }
     };
     ```

   - Try testing the app now, it should work like a charm
     - Notice: where we set variables we have changed the code to use the new state management functions `display.innerText = getNumberToDisplay(symbol);` **VS** `setDisplayText(getNumberToDisplay(symbol));`
     - Notice: The app retains its the old styling
   - Try adding a new Calculator component inside `App.js`
