import { CloseIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

function MistakeCounter({ mistakes }) {
  const mistakesArray = new Array(mistakes).fill("x");

  return (
    <HStack mr="8px">
      {mistakesArray.map((_, index) => (
        <CloseIcon key={index} color="red.500" boxSize={8} />
      ))}
    </HStack>
  );
}

export { MistakeCounter };
