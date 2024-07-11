import { Container, Heading, VStack } from "@chakra-ui/react";
import { LotteryCard } from "../components/LotteryCard";

function ShuffleLayout({ actualCard, cardsHistorial }) {
  return (
    <Container centerContent w="xl">
      <Heading>¡Se va y se corre con!</Heading>
      <VStack align="center" w="100%" mt="16px">
        <LotteryCard
          key={actualCard.id}
          imageUrl={actualCard.imageUrl}
          name={actualCard.name}
          phrase={actualCard.phrase}
          speach={actualCard.speachUrl}
          insideBoard={false}
        />
      </VStack>
    </Container>
  );
}

export { ShuffleLayout };
