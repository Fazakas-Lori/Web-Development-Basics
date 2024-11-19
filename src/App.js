const CreateSymbolButton = (calculator, symbol) => {
  const symbolButton = document.createElement("input");
  symbolButton.type = "button";
  symbolButton.value = symbol;
  calculator.appendChild(symbolButton);

  return symbolButton;
};

const CreateDisplay = (calculator) => {
  const displayContainer = document.createElement("div");
  displayContainer.className = "calculator-display-container";
  const display = document.createElement("span");
  display.className = "calculator-display";
  display.innerText = "0";

  displayContainer.appendChild(display);

  calculator.prepend(displayContainer);
  return display;
};

const CreateCalculator = () => {
  const calculator = document.createElement("div");
  calculator.className = "calculator";
  document.getElementById("app").appendChild(calculator);

  const calculatorButtonContainer = document.createElement("div");
  calculatorButtonContainer.className = "calculator-buttons";

  const display = CreateDisplay(calculator);
  calculator.appendChild(calculatorButtonContainer);

  let number1 = 0;
  let number2 = 0;
  let operator = null;

  const reset = () => {
    number1 = 0;
    number2 = 0;
    operator = null;
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
      number2 = number2 * 10 + number;
      numberToDisplay = number2;
    } else {
      number1 = number1 * 10 + number;
      numberToDisplay = number1;
    }

    return numberToDisplay;
  };

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
      display.innerText = getNumberToDisplay(symbol);
    }
  };

  const symbols = [];

  symbols.push(CreateSymbolButton(calculatorButtonContainer, 0));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, "C"));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, "X"));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, "/"));

  symbols.push(CreateSymbolButton(calculatorButtonContainer, 7));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, 8));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, 9));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, "+"));

  symbols.push(CreateSymbolButton(calculatorButtonContainer, 4));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, 5));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, 6));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, "-"));

  symbols.push(CreateSymbolButton(calculatorButtonContainer, 1));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, 2));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, 3));
  symbols.push(CreateSymbolButton(calculatorButtonContainer, "="));

  symbols.forEach((symbolNode) => {
    symbolNode.addEventListener("click", (e) => {
      handleClick(e.target.value);
    });
  });
};
export { CreateCalculator };
