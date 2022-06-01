import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Functions, State } from "../hooks/use-werdle-game";
import { Word } from "../hooks/use-werdle-reducer";
import Letter from "./letter";

type RowProperties = {
  guess?: Word;
  currentGuess?: string;
  isCurrent?: boolean;
} & Pick<State, "wordLength"> &
  Pick<Functions, "getLetterColorScheme">;

const Row = ({
  guess = [],
  currentGuess = "",
  wordLength,
  isCurrent = false,
  getLetterColorScheme
}: RowProperties): JSX.Element => {
  const fakeButtonSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Flex align="center" justify="center" columnGap={[0.5, 1, 2]} w="full">
      {isCurrent
        ? [...Array.from({ length: wordLength })].map((_, index) => {
            return (
              <Letter
                key={index}
                size={fakeButtonSize}
                variant={
                  currentGuess[index] !== undefined ? "solid" : "outline"
                }
              >
                {currentGuess[index]}
              </Letter>
            );
          })
        : guess.map((letter, index) => {
            const colorScheme = getLetterColorScheme(letter?.state);

            return (
              <Letter
                key={index}
                size={fakeButtonSize}
                colorScheme={colorScheme}
              >
                {letter?.char}
              </Letter>
            );
          })}
    </Flex>
  );
};

export default Row;
