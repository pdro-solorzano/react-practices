import { useEffect, useState } from "react";
import "./App.css";

const OPTIONS = ["✊", "🖐️", "✌️"];
const calculateWinner = (opt1, opt2) => {
  if (opt1 === opt2) {
    return "Draw";
  } else if (
    (opt1 === "✊" && opt2 === "✌️") ||
    (opt1 === "🖐️" && opt2 === "✊") ||
    (opt1 === "✌️" && opt2 === "🖐️")
  ) {
    return "You won! 🎉";
  } else {
    return "You lose 😔";
  }
};

function App() {
  const [version, setVersion] = useState("");
  const [userOption, setUserOption] = useState("");
  const [cpuOption, setCpuOption] = useState("");
  const [counter, setCounter] = useState();

  useEffect(() => {
    if (counter <= 3 && counter > 0) {
      const timeout = setTimeout(() => {
        console.log("timeout");
        setCounter((actual) => actual - 1);
      }, 1000);
    }
    /* return () => {
      if (counter == 0) {
        clearTimeout(timeout);
        console.log("Limpieza timeout");
      }
    }; */
  }, [counter]);

  useEffect(() => {
    const userOpt = userOption;
    if (version === "hacked") {
      switch (userOpt) {
        case "✊":
          setCpuOption("🖐️");
          break;
        case "🖐️":
          setCpuOption("✌️");
          break;
        case "✌️":
          setCpuOption("✊");
          break;
      }
    } else if (version === "normal") {
      const cpuOpt = OPTIONS[Math.floor(Math.random() * 3)];
      setCpuOption(cpuOpt);
    }
  }, [userOption, version]);

  const result = calculateWinner(userOption, cpuOption);

  const resetGame = () => {
    setCpuOption("");
    setUserOption("");
    setCounter();
  };

  return (
    <>
      <h1>Rock Papers Scissor</h1>
      {version === "" && (
        <section>
          <h3>Select version of the game</h3>
          <div className="select-version-section">
            <button
              onClick={() => {
                setVersion("hacked");
              }}
            >
              Hacked
            </button>
            <button
              onClick={() => {
                setVersion("normal");
              }}
            >
              Normal
            </button>
          </div>
        </section>
      )}
      {version !== "" && userOption === "" && (
        <section>
          <h3>Select your option</h3>
          <div className="option-selection-section">
            {OPTIONS.map((opt, index) => (
              <OptionButton
                onSelectOption={(opt) => {
                  setUserOption(opt);
                  setCounter(3);
                }}
                key={index}
              >
                {opt}
              </OptionButton>
            ))}
          </div>
        </section>
      )}
      {version !== "" && userOption !== "" && counter > 0 && <h2>{counter}</h2>}
      {version !== "" && userOption !== "" && counter === 0 && (
        <section>
          <h3>{result}</h3>
          <div className="option-container">
            <h5>CPU Option: </h5>
            <div className="option-div">{cpuOption}</div>
          </div>
          <div className="option-container">
            <h5>Your Option: </h5>
            <div className="option-div">{userOption}</div>
          </div>
          <button
            style={{ marginTop: "8px" }}
            onClick={() => {
              resetGame();
            }}
          >
            Play Again?
          </button>
        </section>
      )}
    </>
  );
}

export default App;

function OptionButton({ children, onSelectOption }) {
  return (
    <button
      onClick={() => {
        onSelectOption(children);
      }}
      className="option-button"
    >
      {children}
    </button>
  );
}
