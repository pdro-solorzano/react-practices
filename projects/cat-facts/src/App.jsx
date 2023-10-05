import { useEffect, useState } from "react";
import "./App.css";
import { getRandomFact } from "./services/facts";
import { getImageFromFact } from "./services/images";

const FACT_API = "https://catfact.ninja/fact";

function App() {
  const [fact, setFact] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getRandomFact(FACT_API).then((data) => {
      setFact(data);
    });
  }, []);

  useEffect(() => {
    if (!fact) return;

    const randomWords = fact.split(" ", 3).join(" ");
    const IMAGE_API = `https://cataas.com/cat/says/${randomWords}?size=50&color=red&json=true`;
    getImageFromFact(IMAGE_API).then((data) => setImage(data));
  }, [fact]);

  return (
    <>
      <h1>Getting a random cat fact</h1>
      <button
        onClick={() => {
          getRandomFact(FACT_API).then((data) => {
            setFact(data);
          });
        }}
      >
        Get new fact
      </button>
      <p>{fact}</p>
      <img src={image} alt="Random cat image" />
    </>
  );
}

export default App;
