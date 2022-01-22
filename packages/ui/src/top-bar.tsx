import { Box, ColorMode, Flex, Icon, Link, Text } from "@chakra-ui/react";
import fromColorMode from "./from-color-mode";
import { getIcon, IconsType } from "./icons";

type TopBarItemProperties = {
  icon: IconsType;
  link: string;
  linkText: string;
};

const TopBarItem = ({
  icon,
  link,
  linkText
}: TopBarItemProperties): JSX.Element => (
  <>
    <Icon as={getIcon("dot")} p={0} h={6} w={6} />
    <Icon as={getIcon(icon)} mr={1} />
    <Link href={link} isExternal>
      {linkText}
    </Link>
  </>
);

type TopBarProperties = {
  colorMode: ColorMode;
};

const TopBar = ({ colorMode }: TopBarProperties): JSX.Element => {
  return (
    <Box
      mb={12}
      p={1}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
    >
      <Flex align="center" direction="row" justify="start">
        <Text>Made by Isaac Barnes-Carr</Text>

        <TopBarItem
          icon="github"
          link="https://github.com/cassi10/"
          linkText="GitHub"
        />
        <TopBarItem
          icon="linkedIn"
          link="https://www.linkedin.com/in/isaac-barnes-carr/"
          linkText="LinkedIn"
        />
        <TopBarItem
          icon="listtask"
          link="https://todolist.ibcarr.com"
          linkText="TodoList"
        />
        <TopBarItem
          icon="games"
          link="https://games.ibcarr.com"
          linkText="Games"
        />
      </Flex>
    </Box>
  );
};

export default TopBar;

TopBar.displayName = "TopBar";
