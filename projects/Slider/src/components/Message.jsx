import "../App.css";
function Message({ actualStep, steps }) {
  return (
    <section className="message">
      <p>{steps[actualStep - 1]}</p>
    </section>
  );
}

export { Message };
