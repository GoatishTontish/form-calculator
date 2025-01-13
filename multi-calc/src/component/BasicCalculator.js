import React, { useState } from "react";
import { Link } from "react-router-dom";

function BasicCalculator() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");

  const formatNumber = (num) => {
    const [integerPart, decimalPart] = num.toString().split(".");
    const cleanedNum = integerPart.replace(/'/g, "");
    let result = "";
  
    let counter = 0;
    for (let i = cleanedNum.length - 1; i >= 0; i--) {
      if (counter && counter % 3 === 0) {
        result = `'` + result;
      }
      result = cleanedNum[i] + result;
      counter++;
    }
  
    return decimalPart ? `${result}.${decimalPart}` : result;
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      calculateResult();
    } else if (value === "AC") {
      setInput("0");
      setResult("0");
    } else if (value === "C") {
      setInput(input.slice(0, -1));
    } else if (value === "%") {
      if (input !== "" && !isNaN(parseFloat(input))) {
        const percentage = parseFloat(input) / 100;
        setInput(percentage.toString());
      }
    } else if (
      ["+", "-", "×", "÷"].includes(value) &&
      ["+", "-", "×", "÷"].includes(input[input.length - 1])
    ) {
      setInput(input.slice(0, -1) + value);
    } else if (value === ".") {
      if (!input.includes(".")) {
        setInput(input + value);
      }
    } else if (input === "0") {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      const cleanInput = input.replace(/×/g, "*").replace(/÷/g, "/");
      const solvedResult = solveInput(cleanInput);
      setResult(formatNumber(solvedResult));
    } catch (error) {
      setResult("Error");
    }
  };

  const solveInput = (input) => {
    const operatorCount = input.match(/(\d+|\+|-|\*|\/)/g);
    if (!operatorCount) return;

    let stack = [];
    for (let i = 0; i < operatorCount.length; i++) {
      if (operatorCount[i] === "*" || operatorCount[i] === "/") {
        const operand1 = parseFloat(stack.pop());
        const operand2 = parseFloat(operatorCount[++i]);
        stack.push(
          operatorCount[i - 1] === "*"
            ? operand1 * operand2
            : operand1 / operand2
        );
      } else {
        stack.push(operatorCount[i]);
      }
    }

    if (stack.length === 1) {
      return stack[0];
    }

    let result = parseFloat(stack.shift());
    while (stack.length > 0) {
      const operator = stack.shift();
      const operand = parseFloat(stack.shift());
      if (operator === "+") {
        result += operand;
      } else if (operator === "-") {
        result -= operand;
      }
    }

    return result.toString();
  };

  return (
    <div className="font-comfortaa bg-blue-100 h-screen">
      <div className="flex justify-center">
        <div className="text-[2.5rem] desktop:text-5xl w-min font-semibold text-center mt-6 mb-6 text-green-600">
          <Link to="/">MultiCalculator</Link>
        </div>
      </div>
      <div className="flex justify-center">
        <label className="border-4 bg-[#444444] border-black tablet:h-24 h-16 desktop:w-[60rem] w-full flex items-end justify-end tablet:text-7xl text-3xl text-white">
          {input || "0"}
        </label>
      </div>
      <div className="flex justify-center">
        <label className="border-4 bg-[#777777] border-black tablet:h-16 h-12 mt-2 desktop:w-[60rem] w-full flex items-end justify-end tablet:text-5xl text-2xl text-white">
          <div>{result && `= ${result}`}</div>
        </label>
      </div>
      <div className="bg-black grid grid-rows-5 grid-cols-4 gap-2 p-4 rounded-3xl desktop:w-[60rem] mx-auto mt-2">
        <button
          onClick={() => handleButtonClick("AC")}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 h-20 active:bg-[#666666]"
        >
          AC
        </button>
        <button
          onClick={() => handleButtonClick("C")}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#666666]"
        >
          C
        </button>
        <button
          onClick={() => handleButtonClick("%")}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#666666]"
        >
          %
        </button>
        <button
          onClick={() => handleButtonClick("÷")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-orange-500"
        >
          /
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#2b2b2b]"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("×")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-orange-500"
        >
          x
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#2b2b2b]"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("-")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-orange-500"
        >
          -
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleButtonClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#2b2b2b]"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("+")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-orange-500"
        >
          +
        </button>

        <button
          onClick={() => handleButtonClick("0")}
          className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#2b2b2b] col-span-2"
        >
          0
        </button>
        <button
          onClick={() => handleButtonClick(".")}
          className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-[#2b2b2b]"
        >
          .
        </button>
        <button
          onClick={() => handleButtonClick("=")}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center tablet:text-5xl text-4xl font-bold desktop:h-32 active:bg-orange-500"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default BasicCalculator;
