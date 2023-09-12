import { useState } from "react";

function Accordion({ index, title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  let number = String(index).padStart(2, "0");

  function handleClick() {
    setIsOpen((actual) => !actual);
  }

  return (
    <div className={`accordion ${isOpen ? "border-active" : ""}`}>
      <header className="accordion-header" onClick={handleClick}>
        <h3 className={`number ${isOpen ? "active" : ""}`}>{number}</h3>
        <h3 className={`title ${isOpen ? "active" : ""}`}>{title}</h3>
        <span className="icon">{isOpen ? "-" : "+"}</span>
      </header>
      <section
        className="accordion-body"
        style={isOpen ? { display: "block" } : {}}
      >
        <p>{children}</p>
      </section>
    </div>
  );
}

export { Accordion };
