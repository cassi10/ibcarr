import { Flex, Box, Heading } from "@chakra-ui/react";
import GameStatus from "@enums/game-status";
import { ReactNode } from "react";
import NewGameButton from "./new-game-button";

const Overlay = (): JSX.Element => (
  <Box
    position="fixed"
    inset={0}
    w="100vw"
    h="100vh"
    zIndex="-1"
    bg="blackAlpha.500"
  />
);

type GameStateDialogProperties = {
  gameStatus: GameStatus;
  newGameButtonClick: () => void;
  winText?: string;
  lossText?: string;
  children: ReactNode;
};

const GameStateDialog = ({
  gameStatus,
  newGameButtonClick,
  winText = "WON",
  lossText = "LOST",
  children
}: GameStateDialogProperties): JSX.Element => (
  <Flex
    align="center"
    flexDirection="column"
    p={8}
    position="absolute"
    width={["xs", "sm"]}
    bg="gray.700"
    zIndex={999}
    shadow="dark-lg"
    rowGap={3}
    rounded="md"
  >
    <Overlay />
    <Heading size="2xl">
      {gameStatus === GameStatus.WON && winText}
      {gameStatus === GameStatus.LOST && lossText}
    </Heading>
    {children}
    <NewGameButton
      mt={4}
      onClick={newGameButtonClick}
      variant="solid"
      colorScheme="purple"
    />
  </Flex>
);

export default GameStateDialog;
