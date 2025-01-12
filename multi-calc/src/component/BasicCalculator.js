import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BasicCalculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState(null);

  const handleClick = (value) => {
    if (value === 'AC') {
      setDisplayValue('0');
      setPreviousValue('');
      setOperator(null);
      return;
    }

    if (value === 'C') {
      setDisplayValue(displayValue.slice(0, -1) || '0');
      return;
    }

    if (value === '=') {
      try {
        let result;
        if (operator) {
          result = calculate(previousValue, displayValue, operator);
        } else {
          result = parseFloat(displayValue);
        }
        setDisplayValue(result.toString());
        setPreviousValue('');
        setOperator(null);
      } catch (error) {
        setDisplayValue('Error');
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      setPreviousValue(displayValue);
      setDisplayValue('0');
      setOperator(value);
      return;
    }

    if (displayValue === '0' && value !== '.') {
      setDisplayValue(value);
    } else if (displayValue.includes('.') && value === '.') {
      return; // Prevent multiple dots
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const calculate = (value1, value2, operator) => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        if (num2 === 0) {
          throw new Error('Division by zero');
        }
        return num1 / num2;
      default:
        throw new Error('Invalid operator');
    }
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
          {displayValue}
        </label>
      </div>
      <div className="bg-black grid grid-rows-5 grid-cols-4 gap-2 p-4 rounded-3xl desktop:w-[60rem] mx-auto mt-2">
        <button
          onClick={() => handleClick('AC')}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          AC
        </button>
        <button
          onClick={() => handleClick('C')}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          C
        </button>
        <button
          onClick={() => handleClick('%')}
          className="bg-[#808080] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          %
        </button>
        <button
          onClick={() => handleClick('/')}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          /
        </button>

        {[7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleClick('*')}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          *
        </button>

        {[4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleClick('-')}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          -
        </button>

        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num.toString())}
            className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleClick('+')}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          +
        </button>

        <button
          onClick={() => handleClick('0')}
          className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32 col-span-2"
        >
          0
        </button>
        <button
          onClick={() => handleClick('.')}
          className="bg-[#3b3b3b] text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          .
        </button>
        <button
          onClick={() => handleClick('=')}
          className="bg-orange-400 text-white text-center rounded-full flex items-center justify-center text-5xl font-bold desktop:h-32"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default BasicCalculator;