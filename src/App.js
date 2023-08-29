import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (value) => {
    if (value === "=") {
      calculateResult();
    } else if (value === "C") {
      clearInput();
    } else if (value === "←") {
      setInput(input.slice(0, -1));
    } else if (value === "√") {
      setInput(input + "√");
    } else {
      setInput(input + value);
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const calculateResult = () => {
    try {
      const expressionWithPercentage = input.replace(/%/g, "/100");
      const expressionWithSqrt = expressionWithPercentage.replace(
        /√(\d+)/g,
        "Math.sqrt($1)"
      );
      const calculatedResult = eval(expressionWithSqrt);
      setResult(calculatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyValue = event.key;
      const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
        "(",
        ")",
        ".",
        "=",
        "%",
        "Enter",
        "Backspace"
      ];

      if (allowedKeys.includes(keyValue)) {
        event.preventDefault();

        if (keyValue === "Enter") {
          calculateResult();
        } else if (keyValue === "Backspace") {
          setInput(input.slice(0, -1));
        } else {
          handleInput(keyValue);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div calssName="container">
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button className="" onClick={() => handleInput("←")}>
          ←
        </button>
        <button className="" onClick={clearInput}>
          C
        </button>
        <button onClick={() => handleInput("√")}>√</button>
        <button className="last" onClick={() => handleInput("+")}>+</button>

        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button className="last" onClick={() => handleInput("-")}>-</button>
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button className="last" onClick={() => handleInput("*")}>x</button>
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button className="last" onClick={() => handleInput("/")}>/</button>
        <button onClick={() => setInput("%")}>%</button>
        <button  onClick={() => handleInput(".")}>.</button>
        <button  onClick={() => handleInput("0")}>0</button>

       
        <button className="last" onClick={calculateResult}>
          =
        </button>
      </div>
    </div>
    </div>
  );
}

export default App;