import "./App.css";
import { useGeolocation } from "./useGeolocation";

function App() {
  const [error, position, isLoading, getPosition] = useGeolocation();

  const positionIsNull = () => {
    return JSON.stringify(position) === "{}";
  };

  return (
    <>
      <div>
        <button onClick={getPosition}>Get my position 🌍</button>
        <br />
        {if (isLoading && positionIsNull) {<span>Your GPS position is loading</span>} else if (!isLoading && !positionIsNull) {<span>Your GPS position: {position.lat}, {position.lng}</span>}}
      </div>
    </>
  );
}

export default App;
