import { getBerryIdByUrl } from "../common/common";

const BERRIES_URL = "https://pokeapi.co/api/v2/berry/";

async function getBerriesList(url = BERRIES_URL) {
  let res = await fetch(url);
  let data = await res.json();

  const berriesPromises = data.results.map(async (berry) => {
    let b = {
      name: berry.name,
      id: getBerryIdByUrl(berry.url),
      sprite: "",
      description: "",
    };

    // get berry individual data
    let berryData = await fetch(berry.url);
    let berryJson = await berryData.json();

    // get sprite and description
    let itemData = await fetch(berryJson.item.url);
    let itemJson = await itemData.json();

    b.sprite = itemJson.sprites.default;
    b.description = itemJson.flavor_text_entries
      .filter((entry) => entry.language.name === "en")
      .at(-1).text;

    return b;
  });

  // wait for all the promises to be finished
  data.results = await Promise.all(berriesPromises);
  return {
    next: data.next,
    previous: data.previous,
    total: data.count,
    results: data.results,
  };
}

async function getBerriesOptions() {
  let res = await fetch(`${BERRIES_URL}?offset=0&limit=100`);
  let data = await res.json();

  return data.results.map((berry) => ({
    id: getBerryIdByUrl(berry.url),
    name: berry.name,
  }));
}

export { getBerriesList, getBerriesOptions };
