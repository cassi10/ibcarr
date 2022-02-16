import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
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
      <IconButton
        variant="solid"
        isRound
        icon={getIconComponent("help", {
          w: 6,
          h: 6
        })}
        aria-label="How to Play"
        onClick={onOpen}
        size="sm"
        ml="auto"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" rowGap={4}>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameInformationModal;
