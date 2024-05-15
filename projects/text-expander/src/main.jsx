import React from "react";
import ReactDOM from "react-dom/client";
import TextSpander from "./TextSpander.jsx";
import "./index.css";
import { useState } from "react";

function TextSpanderTester() {
  const [fTextSpanderState, setFTextSpanderState] = useState(false);
  const [sTextSpanderState, setSTextSpanderState] = useState(false);

  return (
    <>
      <TextSpander
        height={1.6}
        buttonColor="red"
        maxNumberWords={10}
        showMoreButtonText="Mostrar texto"
        showLessButtonText="Ocultar texto"
        onChangeStatus={setFTextSpanderState}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, fuga
        rerum neque velit repellendus delectus, optio laborum quae officia
        veritatis sunt est id nesciunt iste illo non minima magnam commodi!
      </TextSpander>
      <TextSpander onChangeStatus={setSTextSpanderState}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, fuga
        rerum neque velit repellendus delectus, optio laborum quae officia
        veritatis sunt est id nesciunt iste illo non minima magnam commodi!
      </TextSpander>

      <p>First text spander is {fTextSpanderState ? "Open" : "Closed"}</p>
      <p>Second text spander is {sTextSpanderState ? "Open" : "Closed"}</p>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TextSpanderTester />
  </React.StrictMode>
);
