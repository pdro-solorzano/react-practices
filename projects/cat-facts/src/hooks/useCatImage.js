import { useState, useEffect } from "react";
import { getImageFromFact } from "../services/images";

function useCatImage({ fact }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    if (!fact) return;

    const randomWords = fact.split(" ", 3).join(" ");
    const IMAGE_API = `https://cataas.com/cat/says/${randomWords}?size=50&color=red&json=true`;
    getImageFromFact(IMAGE_API).then((data) => setImage(data));
  }, [fact]);

  return { image };
}

export { useCatImage };
