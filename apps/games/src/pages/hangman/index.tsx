import {
  Heading,
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import { getIconComponent } from "@ibcarr/ui";
import stages from "../../data/hangman-stages";
import getRandomWord from "../../data/words";

const Hangman: NextPage = (): JSX.Element => {
  const [word, setWord] = useState<string>("");
  const [letterGuesses, setLetterGuesses] = useState<string[]>([]);
  const [wordGuess, setWordGuess] = useState<string>("");
  const [tries, setTries] = useState<number>(0);
  const [gameState, setGameState] = useState<"won" | "lost" | "playing">(
    "playing"
  );
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const reset = (): void => {
    setWord(getRandomWord());
    setLetterGuesses([]);
    setWordGuess("");
    setTries(0);
    setGameState("playing");
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (word === "") return;

    const isWordValid = (): boolean =>
      [...word].every((letter: string) => letterGuesses.includes(letter));

    if (tries === stages.length - 1) {
      setGameState("lost");
    }

    if (isWordValid()) {
      setGameState("won");
    }
  }, [tries, letterGuesses, word]);

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

  const onLetterClick = (letter: string): void => {
    setLetterGuesses((previousGuesses) => [...previousGuesses, letter]);
    if (!word.includes(letter)) setTries((previousTries) => previousTries + 1);
    setWordGuess("");
  };

  return (
    <>
      <Head>
        <title>Games - Hangman</title>
        <meta name="description" content="A hangman game." />
      </Head>
      <Heading py={8}>
        Hangman
        <Button size="sm" variant="solid" onClick={onNewGameButtonClick} mx={4}>
          New Game
        </Button>
      </Heading>
      <Flex direction="column" align="center" justify="center" gridGap={8}>
        {gameState !== "playing" && (
          <Flex direction="column" align="center" justify="center" gridGap={6}>
            <Text fontSize="4xl">You have {gameState}!</Text>
            <Text fontSize="xl">
              The word was{" "}
              <Text as="span" fontWeight="600" textDecoration="underline">
                <a
                  href={`https://www.merriam-webster.com/dictionary/${word}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {word}
                </a>
              </Text>
            </Text>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={onNewGameButtonClick}
            >
              New Game
            </Button>
          </Flex>
        )}
        <Flex direction="column" align="center" justify="center" gridGap={4}>
          <Text whiteSpace="break-spaces" fontFamily="monospace" fontSize="lg">
            {stages[tries]}
          </Text>
        </Flex>
        <Flex direction="row" align="center" justify="center" gridGap={4}>
          {[...word].map((letter: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={index} fontSize="xl" fontWeight="700">
              <Button
                variant="solid"
                textTransform="uppercase"
                colorScheme="green"
                disabled={!letterGuesses.includes(letter)}
                cursor={!letterGuesses.includes(letter) ? "inherit" : "unset"}
              >
                {!letterGuesses.includes(letter) ? "" : letter}
              </Button>
            </Text>
          ))}
        </Flex>
        <Divider w="55%" />
        <Flex direction="column" align="center" justify="center" gridGap={8}>
          <Flex
            flexFlow="wrap"
            align="center"
            justify="center"
            gridGap={4}
            w="lg"
          >
            {[...alphabet].map((letter: string, index: number) => (
              <Button
                variant="solid"
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                textTransform="uppercase"
                colorScheme="cyan"
                disabled={
                  gameState !== "playing" || letterGuesses.includes(letter)
                }
                onClick={(): void => onLetterClick(letter)}
              >
                {letter}
              </Button>
            ))}
          </Flex>
          <InputGroup size="md" variant="filled">
            <Input
              placeholder="What do you think the word is?"
              variant="filled"
              value={wordGuess}
              onChange={onWordGuessChange}
              disabled={gameState !== "playing"}
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
      </Flex>
    </>
  );
};

export default Hangman;
