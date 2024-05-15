import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StartRating } from "./components/StartRating.jsx";

function TestStars() {
  const [movieStars, setMovieStars] = useState(0);

  return (
    <>
      <StartRating
        color="green"
        maxRating={10}
        onSetRating={(rating) => setMovieStars(rating)}
      />
      <p>This movie was rated {movieStars} stars</p>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StartRating maxRating={5} />
    <StartRating
      size={24}
      color="red"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={1}
    />
    <TestStars />
  </React.StrictMode>
);
