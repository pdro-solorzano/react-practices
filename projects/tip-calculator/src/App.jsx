import { useState } from "react";
import "./App.css";

const OPTIONS = [
  { body: "Dissatisfied (0%)", value: 0 },
  { body: "It was okay (5%)", value: 5 },
  { body: "It was good (10%)", value: 10 },
  { body: "Absolutely amazing (20%)", value: 20 },
];

function App() {
  const [charge, setCharge] = useState(0);
  const [opService1, setOpinionService1] = useState(0);
  const [opService2, setOpinionService2] = useState(0);

  let tip = (((opService1 + opService2) / 2) * charge) / 100;

  function handleChangeCharge(e) {
    if (Number(e.target.value) < 0) return;

    setCharge(Number(e.target.value));
  }

  return (
    <div className="app">
      <h1>Tip Calculator</h1>
      <form>
        <label htmlFor="fname">How much was the bill?</label>
        <input
          type="number"
          name="fname"
          value={charge}
          onChange={handleChangeCharge}
        ></input>
        <label htmlFor="youService">How did you like the service?</label>
        <select
          name="youService"
          value={opService1}
          onChange={(e) => setOpinionService1(Number(e.target.value))}
        >
          {OPTIONS.map((el, index) => (
            <option value={el.value} key={index}>
              {el.body}
            </option>
          ))}
        </select>
        <label htmlFor="fService">How did your friend like the service?</label>
        <select
          name="fService"
          value={opService2}
          onChange={(e) => setOpinionService2(Number(e.target.value))}
        >
          {OPTIONS.map((el, index) => (
            <option value={el.value} key={index}>
              {el.body}
            </option>
          ))}
        </select>
      </form>
      <section>
        {charge !== 0 ? (
          <span>
            You will pay: ${charge + tip} (${charge} + ${tip} tip)
          </span>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
