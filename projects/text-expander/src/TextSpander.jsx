import { useState } from "react";

function TextSpander({
  maxNumberWords = 15,
  showMoreButtonText = "Show more",
  showLessButtonText = "Show less",
  buttonColor = "blue",
  height,
  children,
  onChangeStatus,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const renderedText = isOpen
    ? children
    : children.split(" ").length > maxNumberWords
    ? children.split(" ", maxNumberWords).join(" ")
    : children;
  const isGreatherThanMaxNumberWords =
    children.split(" ").length > maxNumberWords;

  return (
    <div style={{ backgroundColor: "#ccc", lineHeight: height }}>
      {isGreatherThanMaxNumberWords ? (
        <p>
          {renderedText}
          {`${isOpen ? " " : "... "}`}
          <span
            onClick={() => {
              let actualStatus = isOpen;
              setIsOpen((current) => !current);
              onChangeStatus(!actualStatus);
            }}
            style={{
              color: buttonColor,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isOpen ? showLessButtonText : showMoreButtonText}
          </span>{" "}
        </p>
      ) : (
        <p>{renderedText}</p>
      )}
    </div>
  );
}

export default TextSpander;
