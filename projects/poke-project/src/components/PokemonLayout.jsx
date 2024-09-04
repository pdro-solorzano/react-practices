import { useEffect, useState } from "react";
import { getPokemonList } from "../services/pokemon";
import { Input, AutoComplete } from "antd";
import { PokemonList } from "./PokemonList";
import { PokemonInfo } from "./PokemonInfo";

const POKEMON_LIST_API = "https://pokeapi.co/api/v2/pokemon/";

const searchResult = (query, options) => {
  return options
    .filter((opt) =>
      opt.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    .map((opt) => ({ label: opt.name, value: opt.name, id: opt.id }));
};

function PokemonLayout({ pokemonOptions }) {
  const [pokemonList, setPokemonList] = useState({});
  const [pokemonSelected, setPokemonSelected] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelectPokemon = (pokemonId) => {
    setPokemonSelected(pokemonId);
  };
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value, pokemonOptions) : []);
  };
  const handleOnChangePage = (newFetchUrl) => {
    setLoading(true);
    getPokemonList(newFetchUrl).then((data) => {
      setPokemonList(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Get pokemon list
    getPokemonList(POKEMON_LIST_API).then((data) => {
      setPokemonList(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <center>
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{
            width: 300,
            marginBottom: "28px",
          }}
          options={options}
          size="large"
          onSearch={handleSearch}
          onSelect={(value, option) => {
            setPokemonSelected(option.id);
          }}
        >
          <Input.Search
            placeholder="Pikachu..."
            enterButton
            style={{
              width: "300px",
            }}
          />
        </AutoComplete>
      </center>
      {pokemonSelected === 0 ? (
        <>
          <PokemonList
            pokemonListData={pokemonList}
            onSelectPokemon={handleSelectPokemon}
            onChangePage={handleOnChangePage}
            loading={loading}
          />
        </>
      ) : (
        <PokemonInfo
          pokemonId={pokemonSelected}
          handleGoBack={() => {
            setPokemonSelected(0);
            getPokemonList(POKEMON_LIST_API).then((data) => {
              setPokemonList(data);
            });
          }}
        />
      )}
    </div>
  );
}

export { PokemonLayout };
