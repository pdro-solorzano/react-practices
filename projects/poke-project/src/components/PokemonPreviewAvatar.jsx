import { Avatar } from "antd";
import { useEffect, useState } from "react";
import {
  getBackSpriteUrlByPokemon,
  getFrontSpriteUrlByPokemon,
} from "../common/common";

function PokemonPreviewAvatar({ pokemonId }) {
  const [frontPreviewSide, setFrontPreviewSide] = useState(true);

  useEffect(() => {
    let id = setTimeout(() => {
      setFrontPreviewSide((actual) => !actual);
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [frontPreviewSide]);

  return (
    <Avatar
      src={
        frontPreviewSide
          ? getFrontSpriteUrlByPokemon(pokemonId)
          : getBackSpriteUrlByPokemon(pokemonId)
      }
      size={128}
    />
  );
}

export { PokemonPreviewAvatar };
