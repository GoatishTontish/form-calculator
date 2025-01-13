import React, { useState } from "react";
import { Link } from "react-router-dom";

function BasicCalculator2() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [expression, setExpression] = useState([]); 

  const formatNumber = (num) => {
    const cleanedNum = num.toString().replace(/'/g, "");
    let result = "";

    let counter = 0;
    for (let i = cleanedNum.length - 1; i >= 0; i--) {
      if (counter && counter % 3 === 0) {
        result = `'` + result;
      }
      result = cleanedNum[i] + result;
      counter++;
    }

    return result;
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      calculateResult();
    } else if (value === "AC") {
      setInput("");
      setResult("");
      setExpression([]);
    } else if (value === "C") {
      setInput(input.slice(0, -1));
    } else if (value === "%") {
      if (input !== "" && !isNaN(parseFloat(input))) {
        const percentage = parseFloat(input) / 100;
        setInput(percentage.toString());
      }
    } else if (["+", "-", "×", "÷"].includes(value)) {
      if (input !== "") {
        setExpression([...expression, input, value]);
        setInput(""); 
      } else if (expression.length > 0) {
        const updatedExpression = [...expression];
        updatedExpression[updatedExpression.length - 1] = value;
        setExpression(updatedExpression);
      }
    } else if (value === ".") {
      if (!input.includes(".")) {
        setInput(input + value);
      }
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    if (input !== "") {
      const finalExpression = [...expression, input];
      try {
        const cleanExpression = finalExpression.map((item) =>
          item === "×" ? "*" : item === "÷" ? "/" : item
        );
        const solvedResult = solveExpression(cleanExpression);
        setResult(formatNumber(solvedResult));
        setExpression([]);
        setInput("");
      } catch (error) {
        setResult("Error");
      }
    }
  };

  const solveExpression = (exp) => {
    const operatorPrecedence = { "*": 2, "/": 2, "+": 1, "-": 1 };
    const values = [];
    const operators = [];

    const applyOperator = () => {
      const operator = operators.pop();
      const right = parseFloat(values.pop());
      const left = parseFloat(values.pop());

      switch (operator) {
        case "+":
          values.push(left + right);
          break;
        case "-":
          values.push(left - right);
          break;
        case "*":
          values.push(left * right);
          break;
        case "/":
          values.push(left / right);
          break;
        default:
          break;
      }
    };

    exp.forEach((token) => {
      if (!isNaN(token)) {
        values.push(token);
      } else {
        while (
          operators.length > 0 &&
          operatorPrecedence[operators[operators.length - 1]] >=
            operatorPrecedence[token]
        ) {
          applyOperator();
        }
        operators.push(token);
      }
    });

    while (operators.length > 0) {
      applyOperator();
    }

    return values[0];
  };

  return (
    <div className="font-comfortaa">
      <div className="flex justify-center">
        <div className="text-[2.5rem] desktop:text-5xl w-min font-semibold text-center mt-6 mb-6 text-green-600">
          <Link to="/">MultiCalculator</Link>
        </div>
      </div>
      <div className="flex justify-center">
        <label className="border-4 bg-[#444444] border-black h-24 desktop:w-[60rem] w-full flex items-end justify-end text-7xl text-white">
          {input || "0"}
        </label>
      </div>
      <div className="flex justify-center">
        <label className="border-4 bg-[#777777] border-black h-16 mt-2 desktop:w-[60rem] w-full flex items-end justify-end text-5xl text-white">
          <div>{result && `= ${result}`}</div>
        </label>
      </div>
      <div className="bg-black grid grid-rows-5 grid-cols-4 gap-2 p-4 rounded-3xl desktop:w-[60rem] mx-auto mt-2">
        <button
          onClick={() => handleButtonClick("AC")}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          AC
        </button>
        <button
          onClick={() => handleButtonClick("C")}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          C
        </button>
        <button
          onClick={() => handleButtonClick("%")}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          %
        </button>
        <button
          onClick={() => handleButtonClick("÷")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          /
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("×")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          x
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("-")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          -
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("+")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          +
        </button>

        <button
          onClick={() => handleButtonClick("0")}
          className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32 col-span-2"
        >
          0
        </button>
        <button
          onClick={() => handleButtonClick(".")}
          className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          .
        </button>
        <button
          onClick={() => handleButtonClick("=")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default BasicCalculator2;