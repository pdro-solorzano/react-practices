function ProgressBar({
  currentQuestion,
  totalQuestions,
  currentPoints,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={currentQuestion + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestion}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{currentPoints}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export { ProgressBar };
