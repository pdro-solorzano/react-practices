import { useState, useEffect } from "react";
import { getRandomFact } from "../services/facts";

function useCatFact({ url }) {
  const [fact, setFact] = useState("");
  function refreshFact(url) {
    getRandomFact(url).then((data) => {
      setFact(data);
    });
  }
  useEffect(() => {
    refreshFact(url);
  }, []);

  return { fact, refreshFact };
}

export { useCatFact };
