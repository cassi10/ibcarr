import { Tooltip, Text, Link } from "@chakra-ui/react";
import {
  GameContainer,
  GameHeading,
  NewGameButton,
  GameInformationModal,
  GameStateDialog
} from "@components";
import Body from "./components/body";
import Keyboard from "./components/keyboard";
import Solution from "./components/solution";
import WordGuess from "./components/word-guess";
import useHangmanGame, {
  HangmanGameProperties
} from "./hooks/use-hangman-game";

const Hangman = ({ initialWord }: HangmanGameProperties): JSX.Element => {
  const { gameState, state, functions } = useHangmanGame(initialWord);

  return (
    <GameContainer>
      <GameHeading text="Hangman">
        <NewGameButton
          onClick={functions.handleNewGameButtonClick}
          isLoading={state.loading}
          loadingText="New Game"
        />
        <GameInformationModal>
          <Text>
            You will be given a new word every time a new game is started.
          </Text>
          <Text>
            Your job is to guess the word using the letters and input below
            before the man is hung.
          </Text>
          <Text>
            Guess letters using the keyboard below or your computers keyboard
            and if you think you know the word guess it using the input below
            the keyboard.
          </Text>
          <Text fontStyle="italic">
            NOTE: Each solution could be one or more words which contain letters
            only and no spaces.
          </Text>
        </GameInformationModal>
      </GameHeading>

      {!state.isPlaying && (
        <GameStateDialog
          gameStatus={gameState.gameStatus}
          newGameButtonClick={functions.handleNewGameButtonClick}
        >
          <Tooltip label="Click for definition." placement="right" hasArrow>
            <Text fontSize="lg">
              The word was{" "}
              <Link
                fontWeight={600}
                textDecoration="underline"
                href={`https://www.merriam-webster.com/dictionary/${
                  gameState.solution || ""
                }`}
                isExternal
              >
                {gameState.solution}
              </Link>
            </Text>
          </Tooltip>
        </GameStateDialog>
      )}

      <Body
        stage={Math.min(
          gameState.guessedLetters.incorrect.length +
            gameState.incorrectWordGuesses -
            1,
          state.stages.length - 1
        )}
      />

      <Solution
        solution={gameState.solution}
        correct={gameState.guessedLetters.correct}
      />

      <Keyboard
        isPlaying={state.isPlaying}
        hasLetterBeenGuessed={functions.hasLetterBeenGuessed}
        handleKeyboardLetterClick={functions.handleKeyboardLetterClick}
      />

      <WordGuess
        wordGuess={state.wordGuess}
        isPlaying={state.isPlaying}
        handleWordGuessInputChange={functions.handleWordGuessInputChange}
        handleWordGuessSubmit={functions.handleWordGuessSubmit}
      />
    </GameContainer>
  );
};

export { type HangmanGameProperties };
export default Hangman;
