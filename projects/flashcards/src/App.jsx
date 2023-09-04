import { useState } from "react";
import "./App.css";

import { questions } from "./data";

function App() {
  const [showingAnswer, setShowingAnswer] = useState({
    questionId: 0,
    showing: false,
  });

  function handleClick(question) {
    if (question.id === showingAnswer.questionId) {
      setShowingAnswer({ questionId: 0, showing: false });
    } else {
      let newShowingAnswer = {
        ...showingAnswer,
        questionId: question.id,
        showing: true,
      };
      setShowingAnswer(newShowingAnswer);
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
        showingAnswer.showing && showingAnswer.questionId === question.id
          ? { backgroundColor: "orangered" }
          : {}
      }
    >
      <span
        className={`question ${
          showingAnswer.showing && showingAnswer.questionId === question.id
            ? "hide"
            : "show"
        }`}
      >
        {question.question}
      </span>
      <span
        className={`answer ${
          showingAnswer.showing && showingAnswer.questionId === question.id
            ? "show"
            : "hide"
        }`}
      >
        {question.answer}
      </span>
    </div>
  );
}

export default App;
