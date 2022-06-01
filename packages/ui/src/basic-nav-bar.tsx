import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import { memo, ReactNode } from "react";
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
      columnGap={[4, 10]}
      p={2}
      px={4}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
      rounded={["none", "md"]}
      shadow="md"
    >
      <Heading fontSize={["2xl", "3xl"]}>{heading}</Heading>
      {children}
    </Flex>
  );
};

BasicNavBar.displayName = "BasicNavBar";

export default memo(BasicNavBar);
