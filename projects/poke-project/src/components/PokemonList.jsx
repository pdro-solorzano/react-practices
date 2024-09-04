import { List, Typography } from "antd";
import { capitalizeText, getPokemonIdByPokemonData } from "../common/common";
import { PokemonPreviewAvatar } from "./PokemonPreviewAvatar";
import { useState } from "react";
const { Text } = Typography;

function PokemonList({
  pokemonListData,
  onSelectPokemon,
  onChangePage,
  loading,
}) {
  return (
    <List
      bordered
      loading={loading}
      itemLayout="horizontal"
      dataSource={pokemonListData.results}
      pagination={{
        align: "center",
        defaultPageSize: 20,
        total: pokemonListData.total,
        showSizeChanger: false,
        onChange: (page, pageSize) => {
          // https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20
          let offset = pageSize * (page - 1);
          let limit = pageSize;
          onChangePage(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
          );
        },
      }}
      renderItem={(item, index) => (
        <List.Item
          style={{ cursor: "pointer" }}
          onClick={() => {
            onSelectPokemon(Number(item.url.split("/")[6]));
          }}
        >
          <List.Item.Meta
            avatar={
              <PokemonPreviewAvatar
                pokemonId={Number(getPokemonIdByPokemonData(item))}
              />
            }
            title={
              <Text strong style={{ fontSize: "28px" }}>
                {capitalizeText(item.name)}
              </Text>
            }
            description={
              <Text
                type="secondary"
                style={{ fontSize: "16px" }}
                strong
              >{`N.º ${getPokemonIdByPokemonData(item)}`}</Text>
            }
          />
        </List.Item>
      )}
    />
  );
}

export { PokemonList };
