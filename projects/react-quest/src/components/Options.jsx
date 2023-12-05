function Options({ question, answer, dispatch }) {
  return (
    <div className="options">
      {answer !== null
        ? question.options.map((option, index) => (
            <button
              key={index}
              disabled
              className={`btn btn-option ${answer === index ? "answer" : ""} ${
                index === question.correctOption ? "correct" : "wrong"
              }`}
            >
              {option}
            </button>
          ))
        : question.options.map((option, index) => (
            <button
              key={index}
              className="btn btn-option"
              onClick={() => {
                dispatch({
                  type: "selectOption",
                  payload: index,
                });
              }}
            >
              {option}
            </button>
          ))}
    </div>
  );
}

export { Options };
