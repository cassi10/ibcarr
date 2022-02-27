/**
 * TODO: Add keyboard support and stop it from spamming and crashing
 */

import Head from "next/head";
import { Button, Flex, Heading, Text, ThemingProps } from "@chakra-ui/react";
import {
  GameContainer,
  GameHeading,
  GameInformationModal,
  NewGameButton
} from "@components";
import {
  useWerdleReducer,
  GameStateAction,
  LetterState,
  GameStatus,
  type Word,
  type Letter,
  GameErrors
} from "@reducers/use-werdle-reducer";
import { nanoid } from "nanoid/non-secure";
import { useCallback, useEffect, useState } from "react";
import { randomWord, isWordValid } from "@data/werdle-words";

const Werdle = (): JSX.Element => {
  const [{ error, guessedWords, currentRow, solution, status }, dispatch] =
    useWerdleReducer();
  const [currentColumn, setCurrentColumn] = useState<number>(0);
  const [currentWordArray, setCurrentWordArray] = useState<string[]>([]);

  const currentWord = currentWordArray.join("");

  const updateLetterInCurrentWord = (column: number, letter: string): void => {
    setCurrentWordArray((previousCurrentWord) => {
      const currentWordCopy = [...previousCurrentWord];

      currentWordCopy[column] = letter;

      return currentWordCopy;
    });
  };

  /**
   * TODO Pull this out into a separate component
   */
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "back"]
  ];

  const generateEmptyGuessedWordsArray = (): Word[] => {
    return Array.from<Word>({ length: 6 }).fill(
      Array.from<Letter>({ length: 5 }).fill({
        char: "",
        state: LetterState.UNKNOWN
      })
    );
  };

  const getLetterVaraintFromState = (
    state: LetterState
  ): ThemingProps<"Button">["variant"] => {
    if (state === LetterState.UNKNOWN) return "outline";
    return "solid";
  };

  const getLetterColorFromState = (
    state: LetterState
  ): ThemingProps<"Button">["colorScheme"] => {
    if (state === LetterState.CORRECT) return "green";
    if (state === LetterState.VALID) return "orange";
    return "gray";
  };

  useEffect(() => {
    dispatch({
      type: GameStateAction.SET_SOLUTION,
      payload: randomWord()
    });

    dispatch({
      type: GameStateAction.SET_GUESSED_WORDS,
      payload: generateEmptyGuessedWordsArray()
    });

    setCurrentWordArray(Array.from<string>({ length: 5 }).fill(""));
  }, [dispatch]);

  useEffect(() => {
    if (
      currentWord !== solution &&
      currentRow === 6 &&
      status !== GameStatus.WON
    ) {
      dispatch({
        type: GameStateAction.SET_STATUS,
        payload: GameStatus.LOST
      });
    }
  }, [currentWord, currentRow, dispatch, solution, status]);

  const onNewGameButtonClick = (): void => {
    dispatch({
      type: GameStateAction.RESET_GAME
    });

    dispatch({
      type: GameStateAction.SET_SOLUTION,
      payload: randomWord()
    });

    dispatch({
      type: GameStateAction.SET_GUESSED_WORDS,
      payload: generateEmptyGuessedWordsArray()
    });

    setCurrentColumn(0);

    setCurrentWordArray(Array.from<string>({ length: 5 }).fill(""));
  };

  const checkCurrentWord = useCallback(
    (word: string): Word => {
      if (!solution) return [];

      const solutionArray = [...solution];

      const initialCheck: Word = [...word].map(
        (letter: string, index: number) => {
          if (letter === solutionArray[index])
            return {
              char: letter,
              state: LetterState.CORRECT
            };

          if (solutionArray.includes(letter)) {
            return {
              char: letter,
              state: LetterState.VALID
            };
          }

          return {
            char: letter,
            state: LetterState.INCORRECT
          };
        }
      );

      const characterCounts = (
        array: string[] | Word
      ): { [key: string]: number } => {
        const count: { [key: string]: number } = {};
        for (const letter of array) {
          const char = typeof letter === "string" ? letter : letter.char;

          if (count[char]) {
            count[char] += 1;
          } else {
            count[char] = 1;
          }
        }
        return count;
      };

      const solutionCharacterCounts = characterCounts(solutionArray);
      const guessCharacterCounts = characterCounts(initialCheck);

      const result: Word = [...initialCheck.reverse()];

      for (const [index, letter] of initialCheck.entries()) {
        if (letter.state === LetterState.CORRECT) break;

        if (
          guessCharacterCounts[letter.char] >
          solutionCharacterCounts[letter.char]
        ) {
          result[index].state = LetterState.INCORRECT;
          guessCharacterCounts[letter.char] -= 1;
        }
      }

      return result.reverse();
    },
    [solution]
  );

  const onKeyClick = useCallback(
    (key: string): void => {
      if (status !== GameStatus.PLAYING) return;

      if (key === "enter") {
        dispatch({
          type: GameStateAction.SET_ERROR,
          payload: undefined
        });

        if (currentWord.length < 5) {
          dispatch({
            type: GameStateAction.SET_ERROR,
            payload: GameErrors.WORD_TOO_SHORT
          });
          return;
        }

        if (!isWordValid(currentWord)) {
          dispatch({
            type: GameStateAction.SET_ERROR,
            payload: GameErrors.INVALID_WORD
          });
          return;
        }

        const checkedWord: Word = checkCurrentWord(currentWord);

        dispatch({
          type: GameStateAction.ADD_GUESSED_WORD,
          payload: checkedWord
        });

        if (currentWord === solution) {
          dispatch({
            type: GameStateAction.SET_STATUS,
            payload: GameStatus.WON
          });
        }

        dispatch({
          type: GameStateAction.INCREMENT_ROW
        });

        setCurrentColumn(0);

        setCurrentWordArray(Array.from<string>({ length: 5 }).fill(""));
      }

      if (key === "back" || key === "backspace") {
        if (currentColumn === 0) return;

        setCurrentColumn((previousCurrentColumn) => previousCurrentColumn - 1);

        updateLetterInCurrentWord(currentColumn - 1, "");
      }

      if (/^[a-z]$/i.test(key) && currentColumn !== 5) {
        if (currentColumn === 5) return;

        updateLetterInCurrentWord(currentColumn, key);

        setCurrentColumn((previousCurrentColumn) => previousCurrentColumn + 1);
      }
    },
    [currentColumn, dispatch, currentWord, solution, status, checkCurrentWord]
  );

  return (
    <>
      <Head>
        <title>Games - Werdle</title>
        <meta name="description" content="A werdle game." />
      </Head>
      <GameContainer>
        <GameHeading text="Werdle">
          <NewGameButton onClick={onNewGameButtonClick} text="New Game" />
          <GameInformationModal>
            <Text>A random 5 letter word will be selected.</Text>
            <Text>
              Your job is to guess the word in 6 tries by guessing other valid 5
              letter words.
            </Text>
            <Text>After each guess the colour of the tiles will change.</Text>
            <Text>
              A green letter means that the letter and position are correct.
            </Text>
            <Text>
              An orange letter means that the letter is correct but the position
              is not.
            </Text>
            <Text>A gray letter means that the letter is not correct.</Text>
          </GameInformationModal>
        </GameHeading>

        <Text fontSize="lg">{error}</Text>

        {/* Game board */}
        <Flex
          position="relative"
          flexDirection="column"
          align="center"
          justify="center"
          rowGap={2}
        >
          {status !== GameStatus.PLAYING && (
            <Flex
              align="center"
              justify="start"
              flexDirection="column"
              p={8}
              position="absolute"
              width="sm"
              bg="gray.800"
              zIndex={999}
              shadow="dark-lg"
              rowGap={4}
              rounded="md"
              top="20"
            >
              <Heading
                size="2xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                columnGap={4}
              >
                {status === GameStatus.LOST ? "LOST" : "WON"}
                <NewGameButton
                  onClick={onNewGameButtonClick}
                  text="New Game"
                  button={{
                    mt: 2,
                    variant: "solid",
                    colorScheme: "green"
                  }}
                />
              </Heading>
              <Text fontSize="lg">The word was {solution}.</Text>
            </Flex>
          )}
          {guessedWords.map((word, index) => (
            <Flex key={nanoid()} align="center" justify="center" columnGap={2}>
              {(currentRow === index && currentWordArray.length > 0
                ? currentWordArray
                : word
              ).map((_letter, _index) => {
                const isLetterString = typeof _letter === "string";

                const letter: Letter = {
                  char: isLetterString ? _letter : _letter.char,
                  state: isLetterString ? LetterState.UNKNOWN : _letter.state
                };

                const isCellActive =
                  currentRow === index && currentColumn >= _index;

                return (
                  <Button
                    disabled={status !== GameStatus.PLAYING}
                    paddingInline={0}
                    key={nanoid()}
                    variant={getLetterVaraintFromState(letter.state)}
                    colorScheme={getLetterColorFromState(letter.state)}
                    size="lg"
                    cursor="default"
                    outlineOffset={-1}
                    outlineColor={
                      isCellActive ? "whiteAlpha.300" : "transparent"
                    }
                    _focus={{}}
                    onClick={(event): void => event.preventDefault()}
                  >
                    {letter.char.toUpperCase()}
                  </Button>
                );
              })}
            </Flex>
          ))}
        </Flex>

        {/* Keyboard */}
        <Flex
          flexDirection="column"
          align="center"
          justify="center"
          rowGap={2}
          mt={4}
        >
          {keyboard.map((row) => (
            <Flex key={nanoid()} align="center" justify="center" columnGap={2}>
              {row.map((key) => (
                <Button
                  paddingInline={0}
                  key={key}
                  height={10}
                  width={/^[a-z]$/i.test(key) ? 10 : 20}
                  onClick={(): void => onKeyClick(key)}
                  disabled={status !== GameStatus.PLAYING}
                >
                  {key.toUpperCase()}
                </Button>
              ))}
            </Flex>
          ))}
        </Flex>
      </GameContainer>
    </>
  );
};

export default Werdle;
