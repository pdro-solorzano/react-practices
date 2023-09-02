import "../App.css";

function Step({ numStep, isActive }) {
  return <div className={`step ${isActive && "active"}`}>{numStep}</div>;
}

export { Step };
