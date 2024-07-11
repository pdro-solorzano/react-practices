import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
function LotteryCard({
  name,
  speach,
  imageUrl,
  phrase,
  maxW = "xs",
  insideBoard = true,
  h,
  w,
  selected,
  style,
  onSelectCard,
}) {
  return (
    <Card maxW={maxW} w={w} h={h}>
      <CardBody
        padding="8px"
        onClick={() => {
          onSelectCard(name);
        }}
      >
        <Image
          position="relative"
          left={0}
          right={0}
          src={imageUrl}
          alt={`${name} mexican lottery card`}
          borderRadius="md"
          style={style}
        />
        {insideBoard && selected && (
          <CheckCircleIcon
            color="green.500"
            boxSize="full"
            p="8"
            position="absolute"
            top={0}
            left={0}
          />
        )}
      </CardBody>
      {!insideBoard && (
        <CardFooter padding="8px" pt="0px">
          <Text as="b" fontSize="3xl" textAlign="center" width="100%">
            {name}
          </Text>
        </CardFooter>
      )}
    </Card>
  );
}

export { LotteryCard };
