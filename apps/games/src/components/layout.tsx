import {
  Container,
  Box,
  Flex,
  Heading,
  Link,
  useColorMode
} from "@chakra-ui/react";
import NextLink from "next/link";
import { TopBar, fromColorMode } from "@ibcarr/ui";
import GameLink from "./game-link";
import type { Game } from "../types";

const Navbar = (): JSX.Element => {
  const { colorMode } = useColorMode();

  const games: Game[] = [
    { name: "Hangman", href: "/hangman" },
    { name: "Card Match", href: "/cardmatch" },
    { name: "Werdle", href: "/werdle" }
  ];

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
      <NextLink href="/" passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link>
          <Heading>Games</Heading>
        </Link>
      </NextLink>
      <Flex
        rounded="md"
        flex={1}
        gridGap={2}
        alignSelf="stretch"
        align="center"
        justify="start"
        flexWrap="wrap"
      >
        {games.map((game, index) => (
          <GameLink key={game.name} game={game} index={index} />
        ))}
      </Flex>
    </Flex>
  );
};

type LayoutProperties = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProperties): JSX.Element => {
  return (
    <>
      <TopBar />
      <Container maxW="8xl" pb={4}>
        <Flex direction="column" justify="center" align="center">
          <Box flex={1} w="100%">
            <Navbar />
            <main>{children}</main>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Layout;
