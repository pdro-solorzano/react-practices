import { Container, Heading, VStack, Button } from "@chakra-ui/react";

function ModeSelector({ onSelect }) {
  return (
    <Container centerContent w="xl">
      <Heading>Select mode:</Heading>
      <VStack align="stretch" w="100%" mt="16px">
        <Button
          size="lg"
          colorScheme="purple"
          onClick={() => {
            onSelect("play");
          }}
        >
          Play vs cpu
        </Button>
        <Button
          size="lg"
          colorScheme="purple"
          onClick={() => {
            onSelect("shuffle");
          }}
        >
          Shuffle cards
        </Button>
      </VStack>
    </Container>
  );
}

export { ModeSelector };
