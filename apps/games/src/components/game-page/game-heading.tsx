import { Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type GameHeadingProperties = {
  children: ReactNode;
  text: string;
};

const GameHeading = ({
  children,
  text
}: GameHeadingProperties): JSX.Element => (
  <Flex
    alignSelf="center"
    align="center"
    justify="center"
    gridGap={4}
    mt={6}
    mb={2}
    w="75%"
  >
    <Heading>{text}</Heading>
    {children}
  </Flex>
);

export default GameHeading;
