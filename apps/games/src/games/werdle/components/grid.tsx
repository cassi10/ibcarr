import { Flex } from "@chakra-ui/react";
import { Functions, State } from "../hooks/use-werdle-game";
import { GameState } from "../hooks/use-werdle-reducer";
import Row from "./row";

type GridProperties = Pick<GameState, "guesses" | "turn"> &
  Pick<State, "currentGuess" | "wordLength"> &
  Pick<Functions, "getLetterColorScheme">;

const Grid = ({
  guesses,
  turn,
  currentGuess,
  wordLength,
  getLetterColorScheme
}: GridProperties): JSX.Element => {
  return (
    <Flex
      display="inline-flex"
      w="full"
      flexDirection="column"
      align="center"
      justify="center"
      rowGap={[0.5, 1, 2]}
      mt={[0, 4]}
    >
      {guesses.map((guess, index) => {
        if (turn === index)
          return (
            <Row
              getLetterColorScheme={getLetterColorScheme}
              wordLength={wordLength}
              key={index}
              currentGuess={currentGuess}
              isCurrent
            />
          );
        return (
          <Row
            getLetterColorScheme={getLetterColorScheme}
            wordLength={wordLength}
            key={index}
            guess={guess}
          />
        );
      })}
    </Flex>
  );
};

export default Grid;
