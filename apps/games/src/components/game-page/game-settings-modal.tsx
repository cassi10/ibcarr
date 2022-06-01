import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { ReactNode } from "react";

type GameSettingsModalProperties = {
  children: ReactNode;
  onSaveButtonClick?: () => void;
};

const GameSettingsModal = ({
  children,
  onSaveButtonClick
}: GameSettingsModalProperties): JSX.Element => {
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

  const handleSaveButtonClick = (): void => {
    if (onSaveButtonClick) onSaveButtonClick();
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        size={buttonSize}
        icon={getIconComponent("settings")}
        aria-label="Settings"
      />

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent rounded={["none", "md"]}>
          <ModalHeader>Game Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            fontSize={["md", "lg"]}
            paddingInline={12}
            rowGap={4}
          >
            {children}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSaveButtonClick}>
              Save Settings
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameSettingsModal;
