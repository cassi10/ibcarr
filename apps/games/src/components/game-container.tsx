import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type GameContainerProperties = {
  children: ReactNode;
};

const GameContainer = ({ children }: GameContainerProperties): JSX.Element => (
  <Flex direction="column" align="center" justify="center" gridGap={4}>
    {children}
  </Flex>
);

export default GameContainer;
