import { useToast } from "@chakra-ui/react";
import GameStatus from "@enums/game-status";
import { useCallback, useEffect, useState } from "react";
import {
  GameErrors,
  GameState,
  GameStateAction,
  LetterState,
  useWerdleReducer,
  Word
} from "./use-werdle-reducer";

type State = {
  loading: boolean;
  isPlaying: boolean;
  wordLength: number;
  currentGuess: string;
  usedKeys: { [key: string]: LetterState };
};

type Functions = {
  updateWordLength: (newWordLength: number) => void;
  handleNewGameButtonClick: () => void;
  handleKeyUp: (key: string) => void;
  getLetterColorScheme: (
    letterState: LetterState
  ) => "green" | "orange" | "red" | "gray";
};

type WerdleGameProperties = {
  initialWord: string;
  allowedWordLengths: number[];
};

const useWerdleGame = (
  initialWord: WerdleGameProperties["initialWord"]
): {
  gameState: GameState;
  state: State;
  functions: Functions;
} => {
  const toast = useToast({
    status: "warning",
    position: "top",
    variant: "solid"
  });

  const [state, dispatch] = useWerdleReducer();
  const MAXIMUM_TRIES = 6;

  const [usedKeys, setUsedKeys] = useState<State["usedKeys"]>({});
  //   {
  //   a: LetterState.CORRECT,
  //   s: LetterState.VALID,
  //   d: LetterState.INCORRECT,
  //   f: LetterState.UNKNOWN
  // }
  const [currentGuess, setCurrentGuess] = useState<State["currentGuess"]>("");
  const [wordLength, setWordLength] = useState<State["wordLength"]>(5);
  const [loading, setLoading] = useState<State["loading"]>(false);
  // const [hardMode, setHardMode] = useState<boolean>(false);

  const updateWordLength = (newWordLength: number): void =>
    setWordLength(newWordLength);

  const isPlaying = state.gameStatus === GameStatus.PLAYING;

  const getRandomWord = async (length: number): Promise<string> => {
    const response = await fetch(`api/words/word?length=${length}`);
    const data = (await response.json()) as { word: string };
    return data.word;
  };

  const startNewGame = useCallback(
    (word: string, shouldResetGame: boolean) => {
      if (shouldResetGame) {
        dispatch({
          type: GameStateAction.RESET_GAME
        });
      }

      dispatch({
        type: GameStateAction.SET_SOLUTION,
        payload: word
      });

      dispatch({
        type: GameStateAction.SET_GUESSED_WORDS,
        payload: Array.from<Word>({ length: MAXIMUM_TRIES }).fill(
          Array.from({ length: word.length })
        )
      });

      setUsedKeys({});
      setCurrentGuess("");
    },
    [dispatch]
  );

  useEffect(() => {
    startNewGame(initialWord, false);
  }, [initialWord, startNewGame]);

  // start new game whenever word length changes
  useEffect(() => {
    setLoading(true);
    getRandomWord(wordLength)
      .then((newWord): void => {
        return startNewGame(newWord, true);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [wordLength, startNewGame]);

  const handleNewGameButtonClick = (): void => {
    setLoading(true);
    getRandomWord(wordLength)
      .then((newWord): void => {
        return startNewGame(newWord, true);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const characterCountsInString = (
    string_: string
  ): { [key: string]: number } => {
    const characterCounts: { [key: string]: number } = {};

    for (const letter of string_) {
      if (characterCounts[letter]) {
        characterCounts[letter] += 1;
      } else characterCounts[letter] = 1;
    }

    return characterCounts;
  };

  const formatGuess = useCallback(
    (guess: string): Word => {
      if (!state.solution) return [];

      const solutionArray = [...state.solution];

      const letters: Word = [...guess].map((letter, index) => {
        return {
          char: letter,
          state:
            solutionArray[index] === letter
              ? LetterState.CORRECT
              : LetterState.INCORRECT
        };
      });

      const solutionCharacterCounts = characterCountsInString(state.solution);

      const guessCharacterCounts = characterCountsInString(guess);

      for (const letter of letters) {
        if (letter.state === LetterState.CORRECT) {
          solutionCharacterCounts[letter.char] -= 1;
          guessCharacterCounts[letter.char] -= 1;
        }
      }

      for (const [character, count] of Object.entries(guessCharacterCounts)) {
        guessCharacterCounts[character] = Math.min(
          solutionCharacterCounts[character],
          count
        );
      }

      for (const [index, letter] of letters.entries()) {
        if (
          letter.state !== LetterState.CORRECT &&
          guessCharacterCounts[letter.char] > 0
        ) {
          letters[index].state = LetterState.VALID;
          guessCharacterCounts[letter.char] -= 1;
        }
      }

      return letters;
    },
    [state.solution]
  );

  const submitGuess = useCallback((): void => {
    if (state.solution === undefined) return;

    if (currentGuess.length < wordLength) {
      toast({
        title: GameErrors.WORD_TOO_SHORT
      });
      return;
    }

    const formattedGuess = formatGuess(currentGuess.slice(0, wordLength));

    dispatch({
      type: GameStateAction.ADD_GUESSED_WORD,
      payload: formattedGuess
    });

    setUsedKeys((previousUsedKeys) => {
      const previousUsedKeysCopy = { ...previousUsedKeys };

      for (const letter of formattedGuess) {
        const currentLetterKeyState = previousUsedKeysCopy[letter.char];

        if (letter.state === LetterState.CORRECT) {
          previousUsedKeysCopy[letter.char] = LetterState.CORRECT;
        }

        if (
          letter.state === LetterState.VALID &&
          currentLetterKeyState !== LetterState.CORRECT
        ) {
          previousUsedKeysCopy[letter.char] = LetterState.VALID;
        }

        if (
          letter.state === LetterState.INCORRECT &&
          currentLetterKeyState !== (LetterState.CORRECT || LetterState.VALID)
        ) {
          previousUsedKeysCopy[letter.char] = LetterState.INCORRECT;
        }
      }

      return previousUsedKeysCopy;
    });

    setCurrentGuess("");

    if (currentGuess === state.solution) {
      dispatch({
        type: GameStateAction.SET_GAME_STATUS,
        payload: GameStatus.WON
      });
    }

    if (state.turn + 1 === 6 && currentGuess !== state.solution) {
      dispatch({
        type: GameStateAction.SET_GAME_STATUS,
        payload: GameStatus.LOST
      });
    }

    dispatch({
      type: GameStateAction.NEXT_TURN
    });
  }, [
    currentGuess,
    dispatch,
    toast,
    wordLength,
    formatGuess,
    state.solution,
    state.turn
  ]);

  const addLetterToCurrentGuess = (key: string): void => {
    setCurrentGuess((previousCurrentGuess) => previousCurrentGuess + key);
  };

  const removeLetterFromCurrentGuess = (): void => {
    setCurrentGuess((previousCurrentGuess) =>
      previousCurrentGuess.slice(0, -1)
    );
  };

  const handleKeyUp = useCallback(
    (key: string): void => {
      if (state.turn >= MAXIMUM_TRIES) return;
      if (!isPlaying) return;

      if (key === "enter") submitGuess();

      if (key === "backspace") removeLetterFromCurrentGuess();

      if (/^[a-z]$/i.test(key) && currentGuess.length < wordLength)
        addLetterToCurrentGuess(key);
    },
    [currentGuess.length, state.turn, submitGuess, wordLength, isPlaying]
  );

  useEffect(() => {
    const handleKeyupEvent = (event: KeyboardEvent): void =>
      handleKeyUp(event.key.toLowerCase());

    window.addEventListener("keyup", handleKeyupEvent);

    return () => {
      window.removeEventListener("keyup", handleKeyupEvent);
    };
  }, [handleKeyUp]);

  const getLetterColorScheme = (
    letterState: LetterState
  ): "green" | "orange" | "red" | "gray" => {
    switch (letterState) {
      case LetterState.CORRECT: {
        return "green";
      }
      case LetterState.VALID: {
        return "orange";
      }
      case LetterState.INCORRECT: {
        return "red";
      }
      default:
        return "gray";
    }
  };

  return {
    gameState: { ...state },
    state: {
      loading,
      isPlaying,
      wordLength,
      currentGuess,
      usedKeys
    },
    functions: {
      updateWordLength,
      handleNewGameButtonClick,
      handleKeyUp,
      getLetterColorScheme
    }
  };
};

export { type State, type Functions, type WerdleGameProperties };
export default useWerdleGame;
