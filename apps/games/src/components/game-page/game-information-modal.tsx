import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { ReactNode } from "react";

type GameInformationModalProperties = {
  children: ReactNode;
};

const GameInformationModal = ({
  children
}: GameInformationModalProperties): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size="sm" ml="auto" colorScheme="green">
        How to play
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent pb={4}>
          <ModalHeader>How to Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            rowGap={4}
            fontSize="lg"
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameInformationModal;
