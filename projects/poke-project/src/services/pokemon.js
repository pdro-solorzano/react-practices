import { capitalizeText, getPokemonIdByUrl } from "../common/common";

async function getPokemonOptions() {
  const res = await fetch("https://pokeapi.co/api/v2/pokedex/1/");
  const data = await res.json();
  return data.pokemon_entries.map((entry) => ({
    id: entry.entry_number,
    name: capitalizeText(entry.pokemon_species.name),
  }));
}

async function getPokemonList(url) {
  const res = await fetch(url);
  const data = await res.json();
  return {
    next: data.next,
    previous: data.previous,
    total: data.count,
    results: data.results?.map((pokemon) => ({
      name: pokemon.name,
      url: pokemon.url,
    })),
  };
}

async function getPokemon(url, pokemonId) {
  let pokemonData;
  let res = await fetch(`${url}/pokemon/${pokemonId}`);
  let data = await res.json();
  pokemonData = data;
  res = await fetch(data.species.url);
  data = await res.json();
  pokemonData = { ...pokemonData, ...data };
  return filterResponse(pokemonData);
}

async function filterResponse(response) {
  const types = response.types.map((type) => type.type.name);
  const stats = response.stats.map((stat) => ({
    base_stat: stat.base_stat,
    name: stat.stat.name,
  }));
  const flavor_text_entries = response.flavor_text_entries
    .filter((text) => text.language.name === "en")
    .at(-1);
  const genera = response.genera
    .filter((genera) => genera.language.name === "en")
    .map((genera) => genera.genus)
    .at(0);

  return {
    name: response.name,
    order: response.order,
    weight: response.weight,
    height: response.height,
    types,
    stats,
    flavor_text_entries,
    genera,
    evolution_chain: await mappedEvolutiveChain(response.evolution_chain.url),
    weaknesses: await getPokemonWeakness(types),
  };
}

async function mappedEvolutiveChain(evolutionChainUrl) {
  let res = await fetch(evolutionChainUrl);
  let data = await res.json();

  if (data.chain.evolves_to.length === 0) {
    return {
      name: data.chain.species.name,
      id: getPokemonIdByUrl(data.chain.species.url),
      evolves_to: [],
    };
  }

  return {
    name: data.chain.species.name,
    id: getPokemonIdByUrl(data.chain.species.url),
    evolves_to: data.chain.evolves_to.map((firstEvol) => ({
      name: firstEvol.species.name,
      id: getPokemonIdByUrl(firstEvol.species.url),
      evolves_to: firstEvol.evolves_to.map((secondEvol) => ({
        name: secondEvol.species.name,
        id: getPokemonIdByUrl(secondEvol.species.url),
        evolves_to: [],
      })),
    })),
  };
}

async function getPokemonWeakness(types) {
  // get type data from new endpoint
  let weaknessData = await getWeaknessData(types);

  // create arrays, strengths and weaknesses
  let strengths = [];
  let weaknesses = [];
  let retWeaknesses = [];

  // iterate weaknesses data
  weaknessData.forEach((data) => {
    // go through every weakness
    data.damage_relations.double_damage_from.forEach((weaknessData) => {
      // prepare item which will be pushed into the weaknesses array
      let w = { type: weaknessData.name, damage_modificator: 2 };
      // weakness already exists in the weaknesses array, modify damage_modificator
      if (weaknesses.some((weakness) => weakness.type === w.type)) {
        weaknesses = weaknesses.map((el) =>
          el.type !== w.type
            ? el
            : { type: el.type, damage_modificator: el.damage_modificator + 2 }
        );
        // weakness doesn't exist in the weaknesses array, just push a new weakness
      } else {
        weaknesses.push(w);
      }
    });

    // go through every strength and immunity
    data.damage_relations.half_damage_from.forEach((strengthData) => {
      let s = { type: strengthData.name, damage_modificator: 0.5 };
      if (strengths.some((strength) => strength.type === s.type)) {
        strengths = strengths.map((el) =>
          el.type !== s.type
            ? el
            : { type: el.type, damage_modificator: el.damage_modificator - 0.5 }
        );
        // weakness doesn't exist in the weaknesses array, just push a new weakness
      } else {
        strengths.push(s);
      }
    });

    data.damage_relations.no_damage_from.forEach((immunity) => {
      let i = { type: immunity.name, damage_modificator: 0 };
      strengths.push(i);
    });
  });

  // Go through weakness array and check if that weakness exists in the strenghs array and make the required calculations
  if (strengths.length === 0) {
    return weaknesses;
  } else {
    weaknesses.forEach((weakness) => {
      // weakness exists in strenghts, do calculation
      let strength = strengths.find((s) => s.type === weakness.type);
      if (strength !== undefined) {
        let w = {
          type: weakness.type,
          damage_modificator:
            weakness.damage_modificator * strength.damage_modificator,
        };
        if (w.damage_modificator > 1) {
          retWeaknesses.push(w);
        }
      } else {
        retWeaknesses.push(weakness);
      }
    });
  }

  return retWeaknesses;
}

function getWeaknessData(types) {
  // Create an array of fetch promises
  const fetchPromises = types.map((type) =>
    fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) => res.json())
  );

  // Promise.all to wait all promises to resolve
  return Promise.all(fetchPromises)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export { getPokemonList, getPokemon, getPokemonOptions };
