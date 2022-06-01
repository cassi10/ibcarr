import { Divider, Flex, Text } from "@chakra-ui/react";
import GameStatus from "@enums/game-status";
import { Functions } from "../hooks/use-werdle-game";
import { GameState } from "../hooks/use-werdle-reducer";
import Letter from "./letter";

type DisplayGridProperties = Pick<
  GameState,
  "guesses" | "turn" | "gameStatus" | "solution"
> &
  Pick<Functions, "getLetterColorScheme">;

const DisplayGrid = ({
  gameStatus,
  getLetterColorScheme,
  guesses,
  solution,
  turn
}: DisplayGridProperties): JSX.Element => {
  return (
    <Flex
      display="inline-flex"
      w="full"
      flexDirection="column"
      align="center"
      justify="center"
      rowGap={[0.5, 1]}
      mt={[0, 4]}
    >
      {guesses.slice(0, turn).map((guess, index) => {
        return (
          <Flex
            key={index}
            align="center"
            justify="center"
            columnGap={[0.5, 1]}
            w="full"
          >
            {guess.map((letter, index_) => {
              const colorScheme = getLetterColorScheme(letter?.state);

              return (
                <Letter small key={index_} size="md" colorScheme={colorScheme}>
                  {letter?.char}
                </Letter>
              );
            })}
          </Flex>
        );
      })}
      <Divider mt={4} mb={2} />
      {gameStatus === GameStatus.WON && (
        <Text fontSize="lg">
          You got the answer in {turn} {turn === 1 ? "try" : "tries"}.
        </Text>
      )}
      {gameStatus === GameStatus.LOST && (
        <Text fontSize="xl">The answer was</Text>
      )}
      {gameStatus === GameStatus.LOST && solution && (
        <Flex
          align="center"
          justify="center"
          columnGap={[0.5, 1]}
          w="full"
          mt={2}
        >
          {[...solution].map((letter, index_) => (
            <Letter small key={index_} size="md" colorScheme="green">
              {letter}
            </Letter>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default DisplayGrid;
