import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type GameContainerProperties = {
  children: ReactNode;
};

const GameContainer = ({ children }: GameContainerProperties): JSX.Element => (
  <Container
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    gap={4}
    maxW="container.lg"
    paddingInline={[1, 4]}
  >
    {children}
  </Container>
);

export default GameContainer;
