import "./DescriptionCard.css";

function DescriptionCard({ description }) {
  let text = description.split("\n");

  return (
    <>
      {text.map((el, index) => (
        <p className="description" key={index}>
          {el}
        </p>
      ))}
    </>
  );
}

export { DescriptionCard };
