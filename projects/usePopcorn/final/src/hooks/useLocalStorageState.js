import { useEffect, useState } from "react";

function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const localStorageWatchedList = localStorage.getItem(key);
    return localStorageWatchedList
      ? JSON.parse(localStorageWatchedList)
      : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export { useLocalStorageState };
