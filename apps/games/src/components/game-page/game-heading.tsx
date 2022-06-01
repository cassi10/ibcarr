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
    w="full"
    alignSelf="center"
    align="center"
    justify="center"
    gridGap={[2, 4]}
    mt={[4, 6]}
    mb={[0, 2]}
  >
    <Heading fontSize={["2xl", "3xl"]}>{text}</Heading>
    {children}
  </Flex>
);

export default GameHeading;
