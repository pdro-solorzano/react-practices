import {
  Container,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { LotteryCard } from "../components/LotteryCard";
import { LotteryBoard } from "../components/LotteryBoard";
import { useEffect, useState } from "react";
import { ResultModal } from "../components/ResultModal";

const createBoard = (cards) => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    if (board.includes(card)) {
      i = i - 1;
    } else {
      board.push(card);
    }
  }
  return board;
};

function PlayLayout({ actualCard, cards, cardsHistorial, onRestartGame }) {
  const [cardsBoardUser, setCardsBoardUser] = useState([]);
  const [cardsBoardCpu, setCardsBoardCpu] = useState([]);
  const [userMistakes, setUserMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState("play");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Creation of boards at the beginning
  useEffect(() => {
    setCardsBoardCpu(createBoard(cards));
    setCardsBoardUser(createBoard(cards));
  }, []);

  // Cpu play logic
  useEffect(() => {
    let markedCards = cardsBoardCpu.reduce(
      (acc, boardCard) => (boardCard.selected ? acc + 1 : acc),
      0
    );

    if (gameStatus === "pending") {
      setGameStatus("lose");
      onOpen();
      return;
    }

    if (cardsBoardCpu.includes(actualCard)) {
      if (markedCards === cardsBoardCpu.length - 1) {
        setGameStatus("pending");
      }
      setCardsBoardCpu((cards) => {
        return cards.map((card) =>
          actualCard === card ? { ...card, selected: true } : card
        );
      });
    }
  }, [actualCard]);

  // Check winner
  // stop shuffling and show a modal with the winner

  const handleOnSelectCard = (cardName) => {
    let markedCards = cardsBoardUser.reduce(
      (acc, boardCard) => (boardCard.selected ? acc + 1 : acc),
      0
    );

    // Check for third mistake
    if (actualCard.name !== cardName) {
      if (userMistakes === 2) {
        setGameStatus("lose");
        onOpen();
      }
      setUserMistakes((mistakes) => mistakes + 1);
      return;
    }
    if (gameStatus === "pending") {
      setGameStatus("draw");
      onOpen();
    }
    if (markedCards === cardsBoardUser.length - 1) {
      setGameStatus("win");
      onOpen();
    }
    setCardsBoardUser((cards) => {
      return cards.map((card) =>
        actualCard === card ? { ...card, selected: true } : card
      );
    });
  };

  return (
    <Container centerContent minW="full">
      <Heading>¡Se va y se corre con...!</Heading>
      <VStack align="center" w="100%" mt="16px">
        <LotteryCard
          key={actualCard.id}
          imageUrl={actualCard.imageUrl}
          name={actualCard.name}
          phrase={actualCard.phrase}
          speach={actualCard.speachUrl}
          insideBoard={false}
          onSelectCard={() => {}}
          maxW="3xs"
          w="3xs"
          h="sm"
        />

        <HStack w="full" justifyContent="space-around" mt="32px">
          <LotteryBoard
            cardElemenets={cardsBoardCpu}
            title="Cpu"
            onSelectCard={() => {}}
          />
          <LotteryBoard
            cardElemenets={cardsBoardUser}
            title="User"
            onSelectCard={handleOnSelectCard}
            mistakes={userMistakes}
          />
        </HStack>
      </VStack>
      <ResultModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          onRestartGame();
        }}
        result={gameStatus}
      />
    </Container>
  );
}

export { PlayLayout };
