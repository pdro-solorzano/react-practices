/* eslint-disable react/prop-types */
import "./Avatar.css";

function Avatar({ imageUrl, name }) {
  return (
    <img
      className="avatar"
      src={imageUrl}
      alt={`image of ${name} obtained from LinkedIn`}
    />
  );
}

export { Avatar };
