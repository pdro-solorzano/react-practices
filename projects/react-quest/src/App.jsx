import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Loader } from "./components/Loader";
import { Error } from "./components/Error";
import { StartScreen } from "./components/StartScreen";
import { Question } from "./components/Question";
import { Options } from "./components/Options";
import { NextButton } from "./components/NextButton";
import { ProgressBar } from "./components/ProgressBar";
import { FinishedScreen } from "./components/FinishedScreen";
import { Footer } from "./components/Footer";
import { Timer } from "./components/Timer";

/*
  TODO: IMPROVEMENTS SUGGESTIONS
  - USER CAN SELECT THE NUMBER OF QUESTIONS HE WANTS
  - FILTER QUESTIONS PER DIFFICULTY
  - UPLOAD HIGHSCORE TO FAKE API
  - REGISTER ALL ANSWERS INSTEAD OF ONLY THE ACTUAL ANSWER
*/

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  indxCurrentQuestion: 0,
  points: 0,
  answer: null,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "selectOption": {
      const question = state.questions.at(state.indxCurrentQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        indxCurrentQuestion: state.indxCurrentQuestion++,
        answer: null,
        status:
          state.questions.length === state.indxCurrentQuestion - 1
            ? "finished"
            : state.status,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tic-toc":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining--,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };
  }
}

function App() {
  const [
    {
      questions,
      status,
      indxCurrentQuestion,
      points,
      answer,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  let numQuestions = questions.length;
  let currentQuestion = questions[indxCurrentQuestion];
  let totalPoints = questions.reduce(
    (accumulator, current) => accumulator + current.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
        throw new Error("error fetching questions");
      }
    }

    fetchQuestions();
  }, []);

  const handleStartQuiz = () => {
    dispatch({ type: "startQuiz" });
  };

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            onStartQuiz={handleStartQuiz}
          />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              currentPoints={points}
              totalPoints={totalPoints}
              currentQuestion={indxCurrentQuestion}
              totalQuestions={numQuestions}
              answer={answer}
            />
            <Question question={currentQuestion}>
              <Options
                question={currentQuestion}
                answer={answer}
                dispatch={dispatch}
              />
            </Question>
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={indxCurrentQuestion}
                numQuestion={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
