import { Flex } from "@chakra-ui/react";
import { FakeButton } from "@components";
import { GameState } from "../hooks/use-hangman-reducer";

type SolutionProperties = Pick<GameState, "solution"> &
  Pick<GameState["guessedLetters"], "correct">;

const Solution = ({ solution, correct }: SolutionProperties): JSX.Element => {
  return (
    <Flex align="center" justify="center" gap={[1, 2]} flexWrap="wrap">
      {solution &&
        [...correct].map((letter, index) => (
          <FakeButton
            fontWeight="semibold"
            paddingInline={0}
            key={index}
            colorScheme={letter === "" ? "gray" : "green"}
            fontSize={["md", "lg"]}
            boxSize={[8, 10]}
            minWidth={0}
            onClick={(event): void => event.preventDefault()}
          >
            {letter.toUpperCase()}
          </FakeButton>
        ))}
    </Flex>
  );
};

export default Solution;
