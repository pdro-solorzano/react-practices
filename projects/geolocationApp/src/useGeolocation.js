import { useState } from "react";

function useGeolocation() {
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geolocation API");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return [error, position, isLoading, getPosition];
}

export { useGeolocation };
