import "../App.css";
import { Step } from "./Step";

function StepContainer({ steps, actualStep }) {
  return (
    <div className="step-container">
      {steps.map((el, index) => (
        <Step
          numStep={index + 1}
          key={index}
          isActive={actualStep - 1 >= index}
        />
      ))}
    </div>
  );
}

export { StepContainer };
