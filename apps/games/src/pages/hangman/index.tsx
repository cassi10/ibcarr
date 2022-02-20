import {
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
  const [word, setWord] = useState<string>("");
  const [letterGuesses, setLetterGuesses] = useState<string[]>([]);
  const [wordGuess, setWordGuess] = useState<string>("");
  const [tries, setTries] = useState<number>(0);
  const [gameState, setGameState] = useState<"won" | "lost" | "playing">(
    "playing"
  );
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const reset = (): void => {
    setWord(getRandomHangmanWord());
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
      <GameContainer>
        <GameHeading text="Hangman">
          <NewGameButton onClick={onNewGameButtonClick} text="New Game" />
          <GameInformationModal>
            <Text>
              You will be given a new word every time a new game is started.
            </Text>
            <Text>
              Your job guess the word using the letters and input below before
              the man is hung.
            </Text>
          </GameInformationModal>
        </GameHeading>
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
          {[...word].map((letter: string) => (
            <Text
              key={`${Date.now() * Math.random()}${letter}`}
              bg="green.200"
              color="gray.800"
              opacity={!letterGuesses.includes(letter) ? "0.4" : "1"}
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
              {!letterGuesses.includes(letter) ? "" : letter}
            </Text>
          ))}
        </Flex>
        <Divider w="55%" />
        <Flex direction="column" align="center" justify="center" gridGap={8}>
          <Flex
            flexWrap="wrap"
            align="center"
            justify="center"
            gridGap={4}
            w="xl"
          >
            {[...alphabet].map((letter: string, index: number) => (
              <Button
                flex={1}
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
      </GameContainer>
    </>
  );
};

export default Hangman;
