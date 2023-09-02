import "../App.css";

function Button({ text, clickHandler }) {
  return <button onClick={clickHandler}>{text}</button>;
}

export { Button };
