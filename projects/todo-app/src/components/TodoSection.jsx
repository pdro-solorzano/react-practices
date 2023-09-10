const SECTIONS = ["All", "Pending", "Completed"];

function TodoSection({ section, setSection }) {
  function handleClick(e) {
    let newSection = e.target.innerText;
    setSection(newSection);
  }

  return (
    <ul className="todo-section">
      {SECTIONS.map((el, index) => (
        <li
          key={index}
          className={el === section ? "active" : ""}
          onClick={handleClick}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export { TodoSection };
