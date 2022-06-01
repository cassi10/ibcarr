import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useBreakpointValue,
  useColorMode
} from "@chakra-ui/react";
import { memo } from "react";
import fromColorMode from "./from-color-mode";
import { getIcon, type IconsType } from "./icons";

type TopBarItemProperties = {
  icon: IconsType;
  link: string;
  linkText: string;
};

const TopBarItem = ({
  icon,
  link,
  linkText
}: TopBarItemProperties): JSX.Element => {
  const display = useBreakpointValue({ base: "none", md: "inline" });

  return (
    <Flex align="center" justify="center">
      <Icon as={getIcon("dot")} boxSize={4} />
      <Link
        href={link}
        isExternal
        fontSize="md"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        columnGap={[0, 1]}
      >
        <Icon as={getIcon(icon)} boxSize={4} />
        <Text display={display}>{linkText}</Text>
      </Link>
    </Flex>
  );
};

const TopBar = (): JSX.Element => {
  const { colorMode } = useColorMode();

  const links: TopBarItemProperties[] = [
    {
      icon: "github",
      link: "https://github.com/cassi10/",
      linkText: "GitHub"
    },
    {
      icon: "linkedIn",
      link: "https://www.linkedin.com/in/isaac-barnes-carr/",
      linkText: "LinkedIn"
    },
    {
      icon: "listtask",
      link: "https://todolist.ibcarr.com",
      linkText: "TodoList"
    },
    {
      icon: "games",
      link: "https://games.ibcarr.com",
      linkText: "Games"
    }
  ];

  return (
    <Box
      mb={[4, 6]}
      p={1}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
    >
      <Flex align="center" direction="row" justify="start" flexWrap="wrap">
        <Text fontSize={["sm", "md"]}>Made by Isaac Barnes-Carr</Text>
        {links.map(({ icon, linkText, link }) => (
          <TopBarItem key={link} icon={icon} linkText={linkText} link={link} />
        ))}
      </Flex>
    </Box>
  );
};

TopBar.displayName = "TopBar";

export default memo(TopBar);
