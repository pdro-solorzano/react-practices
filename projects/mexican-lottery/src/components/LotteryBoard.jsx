import { Box, Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import { LotteryCard } from "./LotteryCard";
import { MistakeCounter } from "./MistakeCounter";

function LotteryBoard({ cardElemenets, title, onSelectCard, mistakes }) {
  return (
    <Box centerContent style={{ border: "1px solid black" }}>
      <HStack justify="space-between">
        <Heading as="h3" size="lg" noOfLines={1}>
          {title}
        </Heading>
        {title === "User" && <MistakeCounter mistakes={mistakes} />}
      </HStack>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap="2px"
      >
        {cardElemenets.map((el) => (
          <GridItem key={el.id}>
            <LotteryCard
              onSelectCard={onSelectCard}
              name={el.name}
              phrase={el.phrase}
              imageUrl={el.imageUrl}
              speach={el.speachUrl}
              h="full"
              selected={el.selected}
              style={title === "User" ? { cursor: "pointer" } : {}}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export { LotteryBoard };
