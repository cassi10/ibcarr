import GameStatus from "@enums/game-status";
import { useCallback, useEffect, useState } from "react";
import {
  GameState,
  GameStateAction,
  useHangmanReducer
} from "./use-hangman-reducer";
import stages from "../data/hangman-stages";

type State = {
  loading: boolean;
  isPlaying: boolean;
  wordGuess: string;
  stages: JSX.Element[];
};

type Functions = {
  handleNewGameButtonClick: () => void;
  handleKeyboardLetterClick: (key: string) => void;
  handleWordGuessInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleWordGuessSubmit: () => void;
  hasLetterBeenGuessed: (letter: string) => boolean;
};

type HangmanGameProperties = {
  initialWord: string;
};

const useHangmanGame = (
  initialWord: HangmanGameProperties["initialWord"]
): {
  gameState: GameState;
  state: State;
  functions: Functions;
} => {
  const [state, dispatch] = useHangmanReducer();
  const [loading, setLoading] = useState<State["loading"]>(false);
  const [wordGuess, setWordGuess] = useState<State["wordGuess"]>("");

  const isPlaying = state.gameStatus === GameStatus.PLAYING;

  const getRandomWord = async (): Promise<string> => {
    const response = await fetch("api/words/word?length=random");
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

      setWordGuess("");
    },
    [dispatch]
  );

  useEffect(() => {
    startNewGame(initialWord, false);
  }, [initialWord, startNewGame]);

  const handleNewGameButtonClick = (): void => {
    setLoading(true);
    getRandomWord()
      .then((value): void => {
        return startNewGame(value, true);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  };

  const guessLetter = useCallback(
    (key: string): void => {
      dispatch({
        type: GameStateAction.GUESS_LETTER,
        payload: key.toLowerCase()
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      state.guessedLetters.incorrect.length + state.incorrectWordGuesses >=
      stages.length
    )
      dispatch({
        type: GameStateAction.SET_GAME_STATUS,
        payload: GameStatus.LOST
      });
  }, [state.guessedLetters.incorrect, state.incorrectWordGuesses, dispatch]);

  useEffect(() => {
    if (state.guessedLetters.correct.join("") === state.solution)
      dispatch({
        type: GameStateAction.SET_GAME_STATUS,
        payload: GameStatus.WON
      });
  }, [state.guessedLetters.correct, state.solution, dispatch]);

  const handleKeyboardLetterClick = (key: string): void => guessLetter(key);

  const hasLetterBeenGuessed = useCallback(
    (letter: string): boolean =>
      state.guessedLetters.correct.includes(letter) ||
      state.guessedLetters.incorrect.includes(letter),
    [state.guessedLetters]
  );

  const handleKeyPress = useCallback(
    ({ key, target }: KeyboardEvent): void => {
      if (loading) return;
      if (!isPlaying) return;
      if (target instanceof HTMLInputElement) return;
      if (!/^[a-z]$/i.test(key)) return;
      if (hasLetterBeenGuessed(key)) return;

      guessLetter(key);
    },
    [guessLetter, hasLetterBeenGuessed, isPlaying, loading]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleWordGuessInputChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => setWordGuess(value);

  const handleWordGuessSubmit = (): void => {
    if (wordGuess.trim().length === 0) return;

    if (wordGuess.trim() === state.solution) {
      dispatch({
        type: GameStateAction.SET_GAME_STATUS,
        payload: GameStatus.WON
      });
    } else {
      dispatch({
        type: GameStateAction.INCREMENT_INCORRECT_WORD_GUESSES
      });
    }

    setWordGuess("");
  };

  return {
    gameState: { ...state },
    state: {
      loading,
      isPlaying,
      wordGuess,
      stages
    },
    functions: {
      handleNewGameButtonClick,
      handleKeyboardLetterClick,
      handleWordGuessInputChange,
      handleWordGuessSubmit,
      hasLetterBeenGuessed
    }
  };
};

export { type State, type Functions, type HangmanGameProperties };
export default useHangmanGame;
