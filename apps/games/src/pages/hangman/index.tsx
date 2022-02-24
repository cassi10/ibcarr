/**
 * Allow enter press on the input at the bottom to submit.
 */

import {
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  Tooltip,
  Link
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { getIconComponent } from "@ibcarr/ui";
import stages from "../../data/hangman-stages";
import { getRandomHangmanWord } from "../../data/words";
import {
  GameContainer,
  GameHeading,
  GameInformationModal,
  NewGameButton
} from "../../components";

const Hangman = (): JSX.Element => {
  /**
   * TODO Convert this to useReducer instead
   */
  const [word, setWord] = useState<string>("");
  const [letterGuesses, setLetterGuesses] = useState<string[]>([]);
  const [wordGuess, setWordGuess] = useState<string>("");
  const [tries, setTries] = useState<number>(0);
  const [gameState, setGameState] = useState<"won" | "lost" | "playing">(
    "playing"
  );

  /**
   * TODO Pull this out into a separate component
   */
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  const isLetterGuessed = useCallback(
    (letter: string) => letterGuesses.includes(letter),
    [letterGuesses]
  );

  const reset = (): void => {
    setWord(getRandomHangmanWord());
    setLetterGuesses([]);
    setWordGuess("");
    setTries(0);
    setGameState("playing");
  };

  useEffect(() => {
    setWord(getRandomHangmanWord());
  }, []);

  useEffect(() => {
    if (word === "") return;

    const isWordValid = (): boolean =>
      [...word].every((letter: string) => isLetterGuessed(letter));

    if (tries === stages.length - 1) {
      setGameState("lost");
    }

    if (isWordValid()) {
      setGameState("won");
    }
  }, [tries, letterGuesses, word, isLetterGuessed]);

  const onNewGameButtonClick = (): void => reset();

  const onWordGuessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setWordGuess(event.target.value);

  const onWordGuessSubmit = (): void => {
    if (wordGuess === "") return;
    if (wordGuess.trim().toLowerCase() === word) {
      setGameState("won");
    } else {
      setTries((previousTries) => previousTries + 1);
      setWordGuess("");
    }
  };

  const onLetterClick = useCallback(
    (letter: string): void => {
      if (gameState !== "playing") return;
      if (!/^[a-z]$/i.test(letter)) return;
      if (isLetterGuessed(letter)) return;
      setLetterGuesses((previousGuesses) => [...previousGuesses, letter]);
      if (!word.includes(letter))
        setTries((previousTries) => previousTries + 1);
      setWordGuess("");
    },
    [isLetterGuessed, word, gameState]
  );

  const handleKeyboardInput = useCallback(
    (event: KeyboardEvent) => onLetterClick(event.key),
    [onLetterClick]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyboardInput);

    return () => {
      window.removeEventListener("keyup", handleKeyboardInput);
    };
  }, [handleKeyboardInput]);

  return (
    <>
      <Head>
        <title>Games - Hangman</title>
        <meta name="description" content="A hangman game." />
      </Head>
      <GameContainer>
        <GameHeading text="Hangman">
          <NewGameButton onClick={onNewGameButtonClick} text="New Game" />
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
          </GameInformationModal>
        </GameHeading>
        {gameState !== "playing" && (
          <Flex direction="column" align="center" justify="center" gridGap={3}>
            <Text fontSize="4xl">You have {gameState}!</Text>
            <Tooltip label="Click for definition." placement="right" hasArrow>
              <Text fontSize="xl">
                The word was{" "}
                <Link
                  fontWeight={600}
                  textDecoration="underline"
                  href={`https://www.merriam-webster.com/dictionary/${word}`}
                  isExternal
                >
                  {word}
                </Link>
              </Text>
            </Tooltip>
            <Button
              mt={2}
              variant="solid"
              colorScheme="green"
              onClick={onNewGameButtonClick}
            >
              New Game
            </Button>
          </Flex>
        )}
        <Flex direction="column" align="center" justify="center">
          <Text whiteSpace="break-spaces" fontFamily="monospace" fontSize="lg">
            {stages[tries]}
          </Text>
        </Flex>
        <Flex align="center" justify="center" columnGap={4}>
          {[...word].map((letter: string) => (
            <Text
              key={`${Date.now() * Math.random()}${letter}`}
              bg="green.200"
              color="gray.800"
              opacity={
                !isLetterGuessed(letter) || gameState !== "playing"
                  ? "0.4"
                  : "1"
              }
              h={10}
              paddingInline={4}
              w={10}
              lineHeight={1.2}
              rounded="md"
              textTransform="uppercase"
              fontWeight="semibold"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              cursor="default"
            >
              {!isLetterGuessed(letter) ? "" : letter}
            </Text>
          ))}
        </Flex>
        <Divider w="50%" />
        <Flex direction="column" align="center" justify="center" gridGap={8}>
          <Flex
            flexDirection="column"
            align="center"
            justify="center"
            rowGap={3}
          >
            {keyboard.map((row) => (
              <Flex
                key={row.length}
                align="center"
                justify="center"
                columnGap={3}
              >
                {row.map((key) => (
                  <Button
                    key={key}
                    colorScheme="cyan"
                    disabled={
                      gameState !== "playing" || letterGuesses.includes(key)
                    }
                    onClick={(): void => onLetterClick(key)}
                  >
                    {key.toUpperCase()}
                  </Button>
                ))}
              </Flex>
            ))}
          </Flex>
          <InputGroup size="md" variant="filled">
            <Input
              placeholder="Do you want to guess the word?"
              variant="filled"
              value={wordGuess}
              onChange={onWordGuessChange}
              disabled={gameState !== "playing"}
              onKeyUp={(event): false | void =>
                event.key.toLowerCase() === "enter" && onWordGuessSubmit()
              }
            />
            <InputRightElement>
              <IconButton
                size="sm"
                colorScheme="green"
                aria-label="Submit guess"
                icon={getIconComponent("tick")}
                onClick={onWordGuessSubmit}
                disabled={gameState !== "playing"}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </GameContainer>
    </>
  );
};

export default Hangman;
