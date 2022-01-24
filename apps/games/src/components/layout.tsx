import { Container, Box, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { TopBar } from "@ibcarr/ui";
import GameLink from "./game-link";
import type { Game } from "../types";

const Navbar = (): JSX.Element => {
  const games: Game[] = [
    { name: "Hangman", href: "/hangman" },
    { name: "Card Match", href: "/cardmatch" }
    // { name: "Snake", href: "/snake", disabled: true },
    // { name: "Space Invaders", href: "/spaceinvaders", disabled: true },
  ];

  return (
    <Flex align="center" direction="row" justify="center" gridGap={16}>
      <NextLink href="/" passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link>
          <Heading>Games</Heading>
        </Link>
      </NextLink>
      <Flex
        rounded={8}
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
