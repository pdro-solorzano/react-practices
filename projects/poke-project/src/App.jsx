import { useEffect, useState } from "react";
import { MainLayout } from "./components/MainLayout";
import { ContentLayout } from "./components/ContentLayout";
import { PokemonLayout } from "./components/PokemonLayout";
import { getPokemonOptions } from "./services/pokemon";
import { BerriesLayout } from "./components/BerriesLayout";
import { getBerriesOptions } from "./services/berries";

function App() {
  const [activeTab, setActiveTab] = useState("pokedex");
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [berriesOptions, setBerriesOptions] = useState([]);

  useEffect(() => {
    // populate pokemon search options
    getPokemonOptions().then((data) => {
      setPokemonOptions(data);
    });

    // populate berries search options
    getBerriesOptions().then((data) => {
      setBerriesOptions(data);
    });
  }, []);

  return (
    <>
      <MainLayout
        actualTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
        }}
      >
        <ContentLayout title={activeTab}>
          {activeTab === "pokedex" && (
            <PokemonLayout pokemonOptions={pokemonOptions} />
          )}
          {activeTab === "berries" && (
            <BerriesLayout berriesOptions={berriesOptions} />
          )}
        </ContentLayout>
      </MainLayout>
    </>
  );
}

export default App;
