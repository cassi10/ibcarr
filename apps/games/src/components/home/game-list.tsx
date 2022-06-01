import { Button, Container, Heading } from "@chakra-ui/react";
import { colors } from "@ibcarr/utils";
import { Game } from "@types";
import NextLink from "next/link";

const GameList = (): JSX.Element => {
  const games: Game[] = [
    { name: "Hangman", href: "/hangman" },
    { name: "Werdle", href: "/werdle" }
    // { name: "Card Match", href: "/cardmatch" },
  ];

  return (
    <Container
      mt={8}
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      maxW="container.md"
      gap={4}
    >
      {games.map((game, index) => (
        <NextLink passHref href={game.href} key={game.name}>
          <Button
            shadow="md"
            variant="solid"
            colorScheme={colors[index % colors.length]}
            size="lg"
            padding={8}
            height={28}
          >
            <Heading>{game.name}</Heading>
          </Button>
        </NextLink>
      ))}
    </Container>
  );
};

export default GameList;
