import { useState } from "react";
import "./App.css";

// Components
import { Button } from "./components/Button";
import { ButtonContainer } from "./components/ButtonContainer";
import { Display } from "./components/Display";

// Logic Functions
import {
  changeSign,
  deleteCharacter,
  getResult,
  getTypeButton,
  performOperation,
  writeDot,
  writeNumber,
} from "./logic/logic";

const keys = [
  "C",
  "+/-",
  "/",
  "x",
  "7",
  "8",
  "9",
  "-",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "=",
  "0",
  ".",
  "DEL",
];

function App() {
  const [displayNumber, setDisplayNumber] = useState("0");
  const [operation, setOperation] = useState({
    num: 0,
    operation: "",
  });

  function clickHandler(key) {
    switch (key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        setDisplayNumber(writeNumber(key, displayNumber));
        break;
      case ".":
        setDisplayNumber(writeDot(key, displayNumber));
        break;
      case "C":
        clearDisplay();
        break;
      case "DEL":
        setDisplayNumber(deleteCharacter(displayNumber));
        break;
      case "+/-":
        setDisplayNumber(changeSign(displayNumber));
        break;
      case "+":
      case "-":
      case "x":
      case "/":
        setOperation(performOperation(key, operation, displayNumber));
        setDisplayNumber("0");
        break;
      case "=":
        setDisplayNumber(getResult(operation, displayNumber));
        setOperation({ num: 0, operation: "" });
        break;
    }
  }

  function clearDisplay() {
    setDisplayNumber("0");
    setOperation({ num: 0, operation: "" });
  }

  return (
    <section className="calculator-container">
      <Display actualNumber={displayNumber} />
      <ButtonContainer>
        {keys.map((el, index) => (
          <Button
            key={index}
            character={el}
            clickHandler={() => {
              clickHandler(el);
            }}
            typeButton={getTypeButton(el)}
          />
        ))}
      </ButtonContainer>
    </section>
  );
}

export default App;
