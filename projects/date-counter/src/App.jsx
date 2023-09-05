import { useState } from "react";
import "./App.css";

function App() {
  const [multiplier, setMultiplier] = useState(1);
  const [days, setDays] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + days);

  function handleReset() {
    setMultiplier(1);
    setDays(0);
  }

  return (
    <div className="app">
      <h1>Date Counter</h1>
      <MultiplierSlider
        multiplier={multiplier}
        onChangeHandler={setMultiplier}
      />
      <DaysContainer
        days={days}
        multiplier={multiplier}
        onChangeHandler={setDays}
      />
      <p className="message">
        {`${
          days === 0
            ? `Today is ${date.toDateString()}`
            : `${days} from today is ${date.toDateString()}`
        }`}
      </p>
      {days > 0 || multiplier > 1 ? (
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      ) : null}
    </div>
  );
}

function DaysContainer({ days, multiplier, onChangeHandler }) {
  return (
    <div className="days-container">
      <button
        className="minus"
        onClick={() => {
          onChangeHandler(Number(days) - Number(multiplier));
        }}
      >
        -
      </button>
      <input
        className="input-number"
        type="number"
        value={days}
        onChange={(e) => {
          onChangeHandler(Number(e.target.value));
        }}
      />
      <button
        className="plus"
        onClick={() => onChangeHandler(Number(days) + Number(multiplier))}
      >
        +
      </button>
    </div>
  );
}

function MultiplierSlider({ multiplier, onChangeHandler }) {
  return (
    <div className="multiplier-slider">
      <input
        type="range"
        min={1}
        max={10}
        value={multiplier}
        onChange={(e) => onChangeHandler(Number(e.target.value))}
      />
      <span>{multiplier}</span>
    </div>
  );
}

export default App;
