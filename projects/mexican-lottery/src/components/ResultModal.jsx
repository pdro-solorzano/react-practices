import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";

function ResultModal({ result, isOpen, onClose }) {
  const message =
    result === "lose"
      ? "😔😔 You lose! 😔😔"
      : result === "win"
      ? "🎉🎉 You win! 🎉🎉"
      : "Draw!";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Text fontSize="3xl" as="b">
            {message}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { ResultModal };
