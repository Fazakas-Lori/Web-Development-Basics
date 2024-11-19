# Web-Development-Basics

## Creating a BASIC Vanilla JS Calculator / TASKS

1.  Create the container for the calculator

    - Modify `src/App.js`'s CreateCalculator function so when it is called it inserts a new container tag for a calculator, essentially creating one

    ```
    const calculator = document.createElement("div");
    calculator.innerHTML = "<span>some text<span>";
    document.getElementById("app").appendChild(calculator);
    ```

    - Modify `src/index.js` so it calls the `CreateCalculator` function after DOM is loaded `CreateCalculator();`
    - Try it out by running `npm run dev` and checking the DOM
      - Notice: DOM node creation with `document.createElement([tagName])`
      - Notice: DOM node searching/getting with `document.getElementById()`
      - Notice: DOM node insertion with `[node].appendChild()`
      - Notice: DOM node/tree insertion with `[node].innerHTML=`

2.  Create a display for the calculator

    - Call a function called CreateDisplay() and pass the calculator to it: `const display = CreateDisplay(calculator);`
    - Write the `CreateDisplay` function

    ```
      const CreateDisplay = (calculator) => {
      const displayContainer = document.createElement("div");
      const display = document.createElement("span");
      display.innerText = "0";

      displayContainer.appendChild(display);

      calculator.prepend(displayContainer);
      return display;
    };
    ```

    - Delete the calculator's initial span content, that was just for testing purposes ~~`calculator.innerHTML = "<span>some text<span>";`~~
    - Try it out
      - Notice: Appending to a DOM node as first child with `[node].prepend([node])`

3.  Create the Buttons of the calculator

    - Write a function called `CreateSymbolButton` which will take a parent node and a symbol string to insert

    ```
      const CreateSymbolButton = (calculator, symbol) => {
      const symbolButton = document.createElement("input");
      symbolButton.type = "button";
      symbolButton.value = symbol;
      calculator.appendChild(symbolButton);

      return symbolButton;
    };
    ```

    - Add the buttons to the calculator by calling the `CreateSymbolButton` function with the necessary parameters, after the display codes

    ```
      CreateSymbolButton(calculator, 0);
      CreateSymbolButton(calculator, "C");
      CreateSymbolButton(calculator, "X");
      CreateSymbolButton(calculator, "/");

      CreateSymbolButton(calculator, 7);
      CreateSymbolButton(calculator, 8);
      CreateSymbolButton(calculator, 9);
      CreateSymbolButton(calculator, "+");

      CreateSymbolButton(calculator, 4);
      CreateSymbolButton(calculator, 5);
      CreateSymbolButton(calculator, 6);
      CreateSymbolButton(calculator, "-");

      CreateSymbolButton(calculator, 1);
      CreateSymbolButton(calculator, 2);
      CreateSymbolButton(calculator, 3);
      CreateSymbolButton(calculator, "=");
    ```

    - Try it out and dont forget to check the `Developer Tools`'s Console for potential errors in your js code
      - Notice: Creating an input element with `document.createElement("input")`
      - Notice: Setting input type to button with `[inputVar].type = "button"`
      - Notice: `<button></button> vs <input type="button"></input>`
      - Notice: The app is now pretty ugly but we will style it later on

4.  Add interactivity / Click Handlers to the inserted buttons
    - Firstly, gather all buttons in a JS array. Create an array with `const symbols = [];`
    - Modify each `CreateSymbolButton(calculator, 1);` so its return nodes are added to the array, like so `symbols.push(CreateSymbolButton(calculator, 1));`
    - Iterate over the array, and attach an event handler to each calculator buttone node
    ```
      symbols.forEach((symbolNode) => {
        symbolNode.addEventListener("click", (e) => {
          console.log(`${e.target.value} button clicked`);
        });
      });
    ```
    - Try it out while checking the console
      - Notice: Adding event listeners to DOM node with `[node].addEventListener("[event type]")`
      - Notice: JS string interpolation notation with \`${jsObject}\`
      - Notice: `e` object is the event, e.target is the target DOM node, in this case `HTMLInputElement`, e.target.value is its `value` property
5.  Create event handling logic

    - Create a function to handle button click events, named _handleClick_: `const handleClick = (symbol) => {};`
    - Call the new function inside the click event handler

    ```
    symbolNode.addEventListener("click", (e) => {
      handleClick(e.target.value);
    });
    ```

    - Move the console logic inside the new event handler

    ```
    const handleClick = (symbol) => {
      console.log(`${symbol} button clicked`);
    };
    ```

    - Try it out if it still works

6.  Handle button logic accordingly

    - Create 3 variables that represent the memory state of the calculator. The app is very basic, will only be able to handle addition, substraction, multiplication and division between integers - in a buggy manner
      ```
      let number1 = 0;
      let number2 = 0;
      let operator = null;
      ```
    - Create a `reset` named function that will reset the above variables to the starting state - we will need this in the logic

    ```
      const reset = () => {
        number1 = 0;
        number2 = 0;
        operator = null;
      };
    ```

    - Create a `calculateOperationResult` function that will calculate the result on the two numbers

    ```
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
    ```

    - Create the main central logic of the calculator app by modifying the `handleClick` function to the following

    ```
    const handleClick = (symbol) => {
      console.log(`${symbol} button clicked`);
      // special characters
      if (symbol === "C") {
        display.innerText = "0";
        reset();
      } else if (symbol === "+" || symbol === "-" || symbol === "X" || symbol === "/") {
        operator = symbol;
        display.innerText = operator;
      } else if (symbol === "=") {
        display.innerText = calculateOperationResult();
        reset();
      }
      // numbers
      else {
      }
    };
    ```

    - If you try out the app right now, youll notice it doesnt really do anything
      - Notice: In in each branch of the logic we try to calculate the number for the dislay
      - Notice: `display` variable usage / [JS Closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
      - Notice: When pressing `C` symbol, we reset the display and the vars
      - Notice: When pressing `+`, `-`, `X` or `/` symbols, we just set an operator
      - Notice: When pressing `=` symbol, just run a calculation with the two numbers and the operator
    - We need to add logic to handle clicks on number symbols
      - Create a function called `getNumberToDisplay` and call it in the empty else branch of the `handleClick` function

    ```
    else {
      display.innerText = getNumberToDisplay(symbol);
    }
    ```

    - The `getNumberToDisplay` functions' contents look like the following

    ```
    const getNumberToDisplay = (numberStr) => {
      const number = Number(numberStr);
      let numberToDisplay = undefined;

      if (operator !== null) {
        number2 = number2 * 10 + number;
        numberToDisplay = number2;
      } else {
        number1 = number1 * 10 + number;
        numberToDisplay = number1;
      }

      return numberToDisplay;
    };
    ```

    - Try if out now
      - Notice: It works for some scenarios, but not for others - e.g. divisions which give fractional results, operations chaining, etc...
      - Notice: App is ugly, cry a little
