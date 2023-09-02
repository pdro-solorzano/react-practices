import "./App.css";
import { steps } from "./data";

import { StepContainer } from "./components/StepContainer";
import { Message } from "./components/Message";
import { ButtonsContainer } from "./components/ButtonsContainer";
import { Button } from "./components/Button";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);

  function previousHandler() {
    if (step <= 1) return;
    setStep(step - 1);
  }
  function nextHandler() {
    if (step >= 3) return;
    setStep(step + 1);
  }

  return (
    <div className="slider-container">
      <StepContainer steps={steps} actualStep={step} />
      <Message steps={steps} actualStep={step} />
      <ButtonsContainer>
        <Button text="Previous" clickHandler={previousHandler} />
        <Button text="Next" clickHandler={nextHandler} />
      </ButtonsContainer>
    </div>
  );
}

export default App;
