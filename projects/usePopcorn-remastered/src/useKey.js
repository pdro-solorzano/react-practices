import { useEffect } from "react";

function useKey(key, action) {
  useEffect(() => {
    const callback = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);

  /* useEffect(() => {
    const callback = (event) => {
      if (document.activeElement === inputEl.current) {
        return;
      }

      if (event.code === "Enter") {
        inputEl.current.focus();
        handleSearch("");
      }
    };

    document.addEventListener("keydown", callback);
  }, [handleSearch]); */
}

export { useKey };
