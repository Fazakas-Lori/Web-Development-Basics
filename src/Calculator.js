import { useState } from "react";

const Calculator = () => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [operator, setOperator] = useState(null);
  const [displayText, setDisplayText] = useState("0");

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

  return (
    <>
      <div className="calculator">
        <div className="calculator-display-container">
          <div>
            <span className="calculator-display">{displayText}</span>
          </div>
        </div>
        <div className="calculator-buttons">
          <input type="button" value="0" onClick={handleClick} />
          <input type="button" value="C" onClick={handleClick} />
          <input type="button" value="X" onClick={handleClick} />
          <input type="button" value="/" onClick={handleClick} />
          <input type="button" value="7" onClick={handleClick} />
          <input type="button" value="8" onClick={handleClick} />
          <input type="button" value="9" onClick={handleClick} />
          <input type="button" value="+" onClick={handleClick} />
          <input type="button" value="4" onClick={handleClick} />
          <input type="button" value="5" onClick={handleClick} />
          <input type="button" value="6" onClick={handleClick} />
          <input type="button" value="-" onClick={handleClick} />
          <input type="button" value="1" onClick={handleClick} />
          <input type="button" value="2" onClick={handleClick} />
          <input type="button" value="3" onClick={handleClick} />
          <input type="button" value="=" onClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export { Calculator };

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
