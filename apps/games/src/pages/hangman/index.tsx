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
import stages from "@data/hangman-stages";
import getRandomWord from "@data/hangman-words";
import {
  GameContainer,
  GameHeading,
  GameInformationModal,
  NewGameButton
} from "@components";
import {
  useHangmanReducer,
  GameStateAction,
  GameStatus
} from "@reducers/use-hangman-reducer";

const Hangman = (): JSX.Element => {
  const [{ solution, lettersGuesses, status, incorrectTries }, dispatch] =
    useHangmanReducer();
  const [wordGuess, setWordGuess] = useState<string>("");

  /**
   * TODO Pull this out into a separate component
   */
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  const isLetterGuessed = useCallback(
    (letter: string): boolean | undefined => lettersGuesses?.includes(letter),
    [lettersGuesses]
  );

  const isPlaying = status === GameStatus.PLAYING;

  useEffect(
    () =>
      dispatch({
        type: GameStateAction.SET_SOLUTION,
        payload: getRandomWord()
      }),
    [dispatch]
  );

  useEffect(() => {
    if (!solution) return;

    const isWordValid = (): boolean =>
      [...solution].every((letter: string) => isLetterGuessed(letter));

    if (incorrectTries === stages.length - 1)
      dispatch({
        type: GameStateAction.SET_STATUS,
        payload: GameStatus.LOST
      });

    if (isWordValid())
      dispatch({
        type: GameStateAction.SET_STATUS,
        payload: GameStatus.WON
      });
  }, [dispatch, isLetterGuessed, solution, incorrectTries]);

  const onNewGameButtonClick = (): void => {
    dispatch({
      type: GameStateAction.RESET_GAME
    });
    dispatch({
      type: GameStateAction.SET_SOLUTION,
      payload: getRandomWord()
    });
    setWordGuess("");
  };

  const onWordGuessChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setWordGuess(event.target.value);

  const onWordGuessSubmit = (): void => {
    if (!wordGuess) return;
    if (wordGuess.trim().toLowerCase() === solution) {
      dispatch({
        type: GameStateAction.SET_STATUS,
        payload: GameStatus.WON
      });
    } else {
      dispatch({ type: GameStateAction.INCREMENT_INCORRECT_TRIES });
      setWordGuess("");
    }
  };

  const onLetterClick = useCallback(
    (letter: string): void => {
      if (!isPlaying) return;
      if (!/^[a-z]$/i.test(letter)) return;
      if (isLetterGuessed(letter)) return;
      dispatch({ type: GameStateAction.ADD_GUESSED_LETTER, payload: letter });
      if (!solution?.includes(letter))
        dispatch({ type: GameStateAction.INCREMENT_INCORRECT_TRIES });
      setWordGuess("");
    },
    [dispatch, isLetterGuessed, solution, isPlaying]
  );

  const handleKeyboardInput = useCallback(
    (event: KeyboardEvent) =>
      !(event.target instanceof HTMLInputElement) && onLetterClick(event.key),
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
        {!isPlaying && (
          <Flex direction="column" align="center" justify="center" gridGap={3}>
            <Text fontSize="4xl">
              You have {status === GameStatus.LOST ? "lost" : "won"}!
            </Text>
            <Tooltip label="Click for definition." placement="right" hasArrow>
              <Text fontSize="xl">
                The word was{" "}
                <Link
                  fontWeight={600}
                  textDecoration="underline"
                  href={`https://www.merriam-webster.com/dictionary/${
                    solution || ""
                  }`}
                  isExternal
                >
                  {solution}
                </Link>
              </Text>
            </Tooltip>
            <NewGameButton
              onClick={onNewGameButtonClick}
              text="New Game"
              button={{
                mt: 2,
                variant: "solid",
                colorScheme: "green"
              }}
            />
          </Flex>
        )}
        <Flex direction="column" align="center" justify="center">
          <Text whiteSpace="break-spaces" fontFamily="monospace" fontSize="lg">
            {stages[incorrectTries]}
          </Text>
        </Flex>
        <Flex align="center" justify="center" columnGap={4}>
          {solution &&
            [...solution].map((letter: string) => (
              <Text
                key={`${Date.now() * Math.random()}${letter}`}
                bg="green.200"
                color="gray.800"
                opacity={!isLetterGuessed(letter) || !isPlaying ? "0.4" : "1"}
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
            rowGap={2}
          >
            {keyboard.map((row) => (
              <Flex
                key={row.length}
                align="center"
                justify="center"
                columnGap={2}
              >
                {row.map((key) => (
                  <Button
                    key={key}
                    colorScheme="cyan"
                    disabled={!isPlaying || isLetterGuessed(key)}
                    onClick={(): void => onLetterClick(key)}
                    boxSize={10}
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
              disabled={!isPlaying}
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
                disabled={!isPlaying}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </GameContainer>
    </>
  );
};

export default Hangman;
