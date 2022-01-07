import { Box, ColorMode, Flex, Icon, Link, Text } from "@chakra-ui/react";
import fromColorMode from "./from-color-mode";
import { getIcon } from "./icons";

export interface TopBarProperties {
  colorMode: ColorMode;
}

export const TopBar = ({ colorMode }: TopBarProperties): JSX.Element => {
  return (
    <Box
      mb={12}
      p={1}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
    >
      <Flex align="center" direction="row" justify="start">
        <Text>Made by Isaac Barnes-Carr</Text>
        <Icon as={getIcon("dot")} p={0} h={6} w={6} />
        <Icon as={getIcon("github")} mr={1} />
        <Link href="https://github.com/cassi10/" isExternal>
          GitHub
        </Link>
        <Icon as={getIcon("dot")} p={0} h={6} w={6} />
        <Icon as={getIcon("linkedIn")} mr={1} />
        <Link href="https://www.linkedin.com/in/isaac-barnes-carr/" isExternal>
          LinkedIn
        </Link>
        <Icon as={getIcon("dot")} p={0} h={6} w={6} />
        <Icon as={getIcon("listtask")} mr={1} />
        <Link href="https://todolist.ibcarr.com" isExternal>
          TodoList
        </Link>
      </Flex>
    </Box>
  );
};

TopBar.displayName = "TopBar";
