import { useState } from "react";
import "./App.css";
import { Accordion } from "./components/Accordion";

const accordions = [
  {
    title: "Where are these chairs assembled",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat vitae, libero cupiditate debitis incidunt ratione, nostrum consequatur quis pariatur ea repellat voluptatem enim doloribus culpa eaque sint dolor. Dignissimos, dolores?",
  },
  {
    title: "Where are these chairs assembled",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat vitae, libero cupiditate debitis incidunt ratione, nostrum consequatur quis pariatur ea repellat voluptatem enim doloribus culpa eaque sint dolor. Dignissimos, dolores?",
  },
  {
    title: "Where are these chairs assembled",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat vitae, libero cupiditate debitis incidunt ratione, nostrum consequatur quis pariatur ea repellat voluptatem enim doloribus culpa eaque sint dolor. Dignissimos, dolores?",
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(null);

  function onOpenAccordion(index) {
    if (index === isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  }

  return (
    <div className="app">
      {accordions.map((el, index) => (
        <Accordion
          key={index}
          title={el.title}
          index={index + 1}
          isOpen={index === isOpen}
          onOpenAccordion={onOpenAccordion}
        >
          {el.body}
        </Accordion>
      ))}
    </div>
  );
}

export default App;
