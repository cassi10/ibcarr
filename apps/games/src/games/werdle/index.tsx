import {
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Switch,
  Text
} from "@chakra-ui/react";
import {
  GameContainer,
  GameHeading,
  NewGameButton,
  GameInformationModal,
  GameSettingsModal,
  FakeButton,
  GameStateDialog
} from "@components";
import { getIconComponent } from "@ibcarr/ui";
import { ChangeEvent, useState } from "react";
import DisplayGrid from "./components/display-grid";
import Grid from "./components/grid";
import Keyboard from "./components/keyboard";
import useWerdleGame, { WerdleGameProperties } from "./hooks/use-werdle-game";

const Werdle = ({
  initialWord,
  allowedWordLengths
}: WerdleGameProperties): JSX.Element => {
  const { gameState, state, functions } = useWerdleGame(initialWord);

  const [selectedWordLength, setSelectedWordLength] = useState(
    allowedWordLengths[0]
  );

  const handleWordLengthSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ): void =>
    setSelectedWordLength(Number.parseInt(event.currentTarget.value, 10));

  const handleSaveButtonClick = (): void => {
    functions.updateWordLength(selectedWordLength);
  };

  return (
    <GameContainer>
      <GameHeading text="Werdle">
        <ButtonGroup isAttached size="sm">
          <NewGameButton
            onClick={functions.handleNewGameButtonClick}
            isLoading={state.loading}
            loadingText="New Game"
          />

          <GameSettingsModal onSaveButtonClick={handleSaveButtonClick}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="hard-mode-toggle" mb="0">
                Hard Mode?
              </FormLabel>
              <Switch id="hard-mode-toggle" colorScheme="green" disabled />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="word-length-slider" mb="0">
                Word Length
              </FormLabel>
              <Select
                size="sm"
                maxW="max-content"
                value={selectedWordLength}
                onChange={handleWordLengthSelect}
              >
                {allowedWordLengths.map((length) => (
                  <option value={length} key={length}>
                    {length}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GameSettingsModal>
        </ButtonGroup>

        <GameInformationModal>
          <Text>A random word will be selected.</Text>
          <Text>
            Your job is to guess the word in 6 tries by guessing other valid
            words of the same length.
          </Text>
          <Text>After each guess the colour of the tiles will change.</Text>
          <Text>
            <FakeButton
              size="sm"
              textTransform="uppercase"
              colorScheme="green"
              mr={2}
            >
              A
            </FakeButton>
            means that the letter and position are correct.
          </Text>
          <Text>
            <FakeButton
              size="sm"
              textTransform="uppercase"
              colorScheme="orange"
              mr={2}
            >
              S
            </FakeButton>
            means that the letter is correct but the position is not.
          </Text>
          <Text>
            <FakeButton
              size="sm"
              textTransform="uppercase"
              colorScheme="red"
              mr={2}
            >
              D
            </FakeButton>
            means that the letter is not correct.
          </Text>
          <Text>
            <FakeButton
              size="sm"
              textTransform="uppercase"
              colorScheme="gray"
              mr={2}
            >
              F
            </FakeButton>
            means that the letter is unknown.
          </Text>
          <Text fontStyle="italic">
            NOTE: Each solution could be one or more words which contain letters
            only and no spaces.
          </Text>
          <Text fontStyle="italic">
            NOTE: The length of the word can be changed in the settings
            <IconButton
              mx={2}
              size="sm"
              cursor="default"
              _focus={{}}
              icon={getIconComponent("settings")}
              aria-label="Settings"
            />
            menu.
          </Text>
        </GameInformationModal>
      </GameHeading>

      {!state.isPlaying && (
        <GameStateDialog
          gameStatus={gameState.gameStatus}
          newGameButtonClick={functions.handleNewGameButtonClick}
        >
          <DisplayGrid
            gameStatus={gameState.gameStatus}
            solution={gameState.solution}
            guesses={gameState.guesses}
            turn={gameState.turn}
            getLetterColorScheme={functions.getLetterColorScheme}
          />
        </GameStateDialog>
      )}

      {/* Game board */}
      <Grid
        wordLength={state.wordLength}
        guesses={gameState.guesses}
        turn={gameState.turn}
        currentGuess={state.currentGuess}
        getLetterColorScheme={functions.getLetterColorScheme}
      />

      {/* Keyboard */}
      <Keyboard
        onKeyPress={functions.handleKeyUp}
        usedKeys={state.usedKeys}
        getLetterColorScheme={functions.getLetterColorScheme}
      />
    </GameContainer>
  );
};

export { type WerdleGameProperties };
export default Werdle;
