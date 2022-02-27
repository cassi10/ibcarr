import { Container, Box, Flex } from "@chakra-ui/react";
import { TopBar, BasicNavBar } from "@ibcarr/ui";
import type { Game } from "@types";
import { GameLink } from "@components";

const NavBar = (): JSX.Element => {
  const games: Game[] = [
    { name: "Hangman", href: "/hangman" },
    { name: "Card Match", href: "/cardmatch" },
    { name: "Werdle", href: "/werdle" }
  ];

  return (
    <BasicNavBar heading="Games">
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
    </BasicNavBar>
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
            <NavBar />
            <main>{children}</main>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Layout;
