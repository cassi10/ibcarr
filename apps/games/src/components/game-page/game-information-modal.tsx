import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
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

  const modalSize = useBreakpointValue({
    base: "full",
    sm: "sm",
    md: "xl"
  });

  const buttonSize = useBreakpointValue({
    base: "xs",
    sm: "sm"
  });

  return (
    <>
      <Button onClick={onOpen} size={buttonSize} ml="auto" colorScheme="green">
        How to play
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent pb={4} rounded={["none", "md"]}>
          <ModalHeader>How to Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            rowGap={4}
            fontSize={["md", "lg"]}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameInformationModal;
