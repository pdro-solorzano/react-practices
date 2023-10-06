import "./App.css";
import { useCatFact } from "./hooks/useCatFact";
import { useCatImage } from "./hooks/useCatImage";

const FACT_API = "https://catfact.ninja/fact";

function App() {
  const { fact, refreshFact } = useCatFact({ url: FACT_API });
  const { image } = useCatImage({ fact });

  return (
    <>
      <h1>Getting a random cat fact</h1>
      <button
        onClick={() => {
          refreshFact(FACT_API);
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
