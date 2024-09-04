import {
  Card,
  Image,
  Flex,
  Typography,
  Descriptions,
  Progress,
  Tooltip,
  Button,
  Skeleton,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  getFrontHomeSpriteUrlByPokemon,
  capitalizeText,
} from "../common/common";
import { useEffect, useState } from "react";
import { getPokemon } from "../services/pokemon";
import { TypeTag } from "./TypeTag";

const POKEMON_API = "https://pokeapi.co/api/v2/";
const MAX_BASE_STAT = 225;

function PokemonInfo({ pokemonId, handleGoBack }) {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemon(POKEMON_API, pokemonId).then((data) => {
      setPokemonData(data);
      console.log(data);
      setLoading(false);
    });
  }, [pokemonId]);

  const formattedNumberPokedex = (noPokedex) => {
    return noPokedex.padStart(4, "0");
  };
  const mappedDescriptions = (pokemonData) => {
    return [
      {
        key: "height",
        label: "Height",
        children: `${Number(pokemonData.height) / 10} m`,
      },
      { key: "category", label: "Category", children: pokemonData.genera },
      {
        key: "weight",
        label: "Weight",
        children: `${Number(pokemonData.weight) / 10} kg`,
      },
    ];
  };
  const getBaseStatsPercentage = (stats) => {
    return stats?.map((stat) => ({
      base_stat: stat.base_stat,
      name: stat.name,
      percentage: parseFloat(
        Number((stat.base_stat * 100) / MAX_BASE_STAT).toFixed(0)
      ),
    }));
  };

  return (
    <Card
      extra={
        loading ? (
          <Skeleton.Button active shape="circle" />
        ) : (
          <Tooltip title="Go back">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
            />
          </Tooltip>
        )
      }
    >
      <Card.Grid hoverable={false} style={{ width: "30%" }}>
        {loading ? (
          <Skeleton.Image active />
        ) : (
          <Image width="100%" src={getFrontHomeSpriteUrlByPokemon(pokemonId)} />
        )}
      </Card.Grid>
      <Card.Grid hoverable={false} style={{ width: "70%" }}>
        <Flex
          vertical
          align="flex-start"
          justify="space-between"
          style={{
            padding: 32,
          }}
        >
          <Skeleton active loading={loading}>
            <Typography.Title>
              {capitalizeText(pokemonData.name)}
              <span>
                {` N.º ${formattedNumberPokedex(pokemonData.order + "")}`}
              </span>
            </Typography.Title>
            <Typography.Paragraph>
              {pokemonData.flavor_text_entries?.flavor_text}
            </Typography.Paragraph>

            <Descriptions items={mappedDescriptions(pokemonData)} />
            <Card title={<center>Base Stats</center>} style={{ width: "100%" }}>
              {getBaseStatsPercentage(pokemonData.stats)?.map((stat) => (
                <>
                  <Progress
                    percent={stat.percentage}
                    key={stat.name}
                    format={() => ""}
                  />
                  <span>{`${capitalizeText(stat.name)} - ${
                    stat.percentage
                  }%`}</span>
                </>
              ))}
            </Card>
            <div>
              <Typography.Title>Type</Typography.Title>
              <Flex gap="4px 0" wrap>
                {pokemonData.types?.map((type) => (
                  <TypeTag type={type} key={type} />
                ))}
              </Flex>
            </div>
            <div>
              <Typography.Title>Weakness</Typography.Title>
              <Flex gap="4px 0" wrap>
                {pokemonData.weaknesses?.map((weakness) => (
                  <TypeTag
                    type={weakness.type}
                    damageMod={weakness.damage_modificator}
                    key={weakness.type}
                  />
                ))}
              </Flex>
            </div>
          </Skeleton>
        </Flex>
      </Card.Grid>
    </Card>
  );
}

export { PokemonInfo };
