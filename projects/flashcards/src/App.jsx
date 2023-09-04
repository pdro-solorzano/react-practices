import { useState } from "react";
import "./App.css";

import { questions } from "./data";

function App() {
  const [showingAnswer, setShowingAnswer] = useState(null);

  function handleClick(question) {
    if (question.id === showingAnswer) {
      setShowingAnswer(null);
    } else {
      setShowingAnswer(question.id);
    }
  }

  return (
    <div className="app">
      {questions.map((q) => (
        <Flashcard
          question={q}
          showingAnswer={showingAnswer}
          clickHandler={() => {
            handleClick(q);
          }}
          key={q.id}
        />
      ))}
    </div>
  );
}

function Flashcard({ question, showingAnswer, clickHandler }) {
  return (
    <div
      className="flashcard"
      onClick={clickHandler}
      style={
        showingAnswer === question.id ? { backgroundColor: "orangered" } : {}
      }
    >
      <span>
        {showingAnswer === question.id ? question.answer : question.question}
      </span>
    </div>
  );
}

export default App;
