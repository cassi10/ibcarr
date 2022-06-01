import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { Functions, State } from "../hooks/use-hangman-game";

type WordGuessProperties = Pick<State, "wordGuess" | "isPlaying"> &
  Pick<Functions, "handleWordGuessInputChange" | "handleWordGuessSubmit">;

const WordGuess = ({
  wordGuess,
  isPlaying,
  handleWordGuessInputChange,
  handleWordGuessSubmit
}: WordGuessProperties): JSX.Element => {
  return (
    <InputGroup size="md" variant="filled" maxWidth="md">
      <Input
        placeholder="Do you want to guess the word?"
        variant="filled"
        value={wordGuess}
        onChange={handleWordGuessInputChange}
        disabled={!isPlaying}
        onKeyUp={(event): void =>
          event.key.toLowerCase() === "enter"
            ? handleWordGuessSubmit()
            : undefined
        }
      />
      <InputRightElement>
        <IconButton
          size="sm"
          colorScheme="green"
          aria-label="Submit guess"
          icon={getIconComponent("tick")}
          onClick={handleWordGuessSubmit}
          disabled={!isPlaying}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default WordGuess;
