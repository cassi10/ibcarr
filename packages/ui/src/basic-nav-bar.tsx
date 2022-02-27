import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
import fromColorMode from "./from-color-mode";

type BasicNavBarProperties = {
  heading: string;
  children: ReactNode;
};

const BasicNavBar = ({
  heading,
  children
}: BasicNavBarProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      align="center"
      justify="space-between"
      direction="row"
      h={16}
      columnGap={12}
      p={2}
      px={4}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
      rounded="md"
      shadow="md"
    >
      <Heading>{heading}</Heading>
      {children}
    </Flex>
  );
};

export default BasicNavBar;
