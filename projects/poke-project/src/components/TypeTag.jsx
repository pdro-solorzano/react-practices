import { Tag, Tooltip } from "antd";
import { StarFilled } from "@ant-design/icons";
import { capitalizeText } from "../common/common";
import { useState } from "react";

function TypeTag({ type, damageMod }) {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  let color = "";

  switch (type) {
    case "normal":
      color = "#a4acaf";
      break;
    case "fighting":
      color = "#d56723";
      break;
    case "flying":
      color = "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)";
      break;
    case "poison":
      color = "#b97fc9";
      break;
    case "ground":
      color = "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)";
      break;
    case "rock":
      color = "#a38c21";
      break;
    case "bug":
      color = "#729f3f";
      break;
    case "ghost":
      color = "#7b62a3";
      break;
    case "steel":
      color = "#9eb7b8";
      break;
    case "fire":
      color = "#fd7d24";
      break;
    case "water":
      color = "#4592c4";
      break;
    case "grass":
      color = "#9bcc50";
      break;
    case "electric":
      color = "#eed535";
      break;
    case "psychic":
      color = "#f366b9";
      break;
    case "ice":
      color = "#51c4e7";
      break;
    case "dragon":
      color = "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)";
      break;
    case "dark":
      color = "#707070";
      break;
    case "fairy":
      color = "#fdb9e9";
      break;
    default:
      color = "#a4acaf";
      break;
  }

  return (
    <>
      {damageMod > 2 ? (
        <Tooltip title={`Damage x${damageMod}`}>
          <Tag
            icon={damageMod > 2 ? <StarFilled /> : ""}
            style={{
              width: "100px",
              textAlign: "center",
              background: color,
              fontSize: "18px",
              padding: "4px",
            }}
          >
            {capitalizeText(type)}
          </Tag>
        </Tooltip>
      ) : (
        <Tag
          style={{
            width: "100px",
            textAlign: "center",
            background: color,
            fontSize: "18px",
            padding: "4px",
          }}
        >
          {capitalizeText(type)}
        </Tag>
      )}
    </>
  );
}

export { TypeTag };
