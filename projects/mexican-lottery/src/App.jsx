import data from "./data/LotteryCards.json";
import { LotteryCard } from "./components/LotteryCard";
import { useState } from "react";
import { ModeSelector } from "./components/ModeSelector";
import { Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { ShuffleLayout } from "./layout/ShuffleLayout";
import { PlayLayout } from "./layout/PlayLayout";

function App() {
  const [gameMode, setGameMode] = useState("");
  const [iteration, setIteration] = useState(0);
  const [actualCard, setActualCard] = useState({});
  const [historial, setHistorial] = useState([]);

  // Shifts cards
  useEffect(() => {
    let newCards = data.cards;
    for (let i = 0; i < data.cards.length; i++) {
      const cardIndex = Math.floor(Math.random() * (data.cards.length - i));
      const temp = newCards;
      newCards = temp.slice(0, cardIndex);
      newCards.push(...temp.slice(cardIndex + 1), temp[cardIndex]);
    }
    data.cards = newCards;
  }, [gameMode]);

  // give card
  useEffect(() => {
    if (
      gameMode !== "" &&
      iteration >= 0 &&
      iteration <= data.cards.length - 1
    ) {
      if (iteration === 0) {
        const card = data.cards[iteration];
        setIteration((iteration) => iteration + 1);
        setActualCard(card);
        setHistorial((historial) => [...historial, card]);
        return;
      }
      setTimeout(() => {
        const card = data.cards[iteration];
        setIteration((iteration) => iteration + 1);
        setActualCard(card);
        setHistorial((historial) => [...historial, card]);
      }, 5000);
      return;
    }
  }, [gameMode, iteration]);

  const handleRestartGame = () => {
    setGameMode("");
    setIteration(0);
    setActualCard({});
    setHistorial([]);
  };

  return (
    <Flex
      direction="column"
      justify="space-around"
      gap="32px"
      marginTop="16px"
      w="full"
    >
      <Heading textAlign="center">Mexican Lottery</Heading>
      {gameMode === "" && (
        <ModeSelector
          onSelect={(selection) => {
            setGameMode(selection);
          }}
        />
      )}
      {gameMode === "play" && (
        // Here should be, actual playing card, cpu board and user board (clickable to allow selection of the board)
        <PlayLayout
          actualCard={actualCard}
          cards={data.cards}
          cardsHistorial={historial}
          onRestartGame={handleRestartGame}
        />
      )}
      {gameMode === "shuffle" && (
        // Here should be the actual playing card only
        <ShuffleLayout actualCard={actualCard} cardsHistorial={historial} />
      )}
    </Flex>
  );
}

export default App;
