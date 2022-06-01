import GameStatus from "@enums/game-status";
import { Dispatch, useReducer } from "react";

type GameState = {
  solution: string | undefined;
  guessedLetters: {
    correct: string[];
    incorrect: string[];
  };
  incorrectWordGuesses: number;
  gameStatus: GameStatus;
};

const initialGameState: GameState = {
  solution: undefined,
  guessedLetters: {
    correct: [],
    incorrect: []
  },
  incorrectWordGuesses: 0,
  gameStatus: GameStatus.PLAYING
};

enum GameStateAction {
  SET_SOLUTION,
  GUESS_LETTER,
  INCREMENT_INCORRECT_WORD_GUESSES,
  SET_GAME_STATUS,
  RESET_GAME
}

type GameStateActions =
  | {
      type: GameStateAction.SET_SOLUTION | GameStateAction.GUESS_LETTER;
      payload: string;
    }
  | { type: GameStateAction.SET_GAME_STATUS; payload: GameState["gameStatus"] }
  | {
      type:
        | GameStateAction.RESET_GAME
        | GameStateAction.INCREMENT_INCORRECT_WORD_GUESSES;
    };

const gameStateReducer = (
  state: GameState,
  action: GameStateActions
): GameState => {
  const { type } = action;

  switch (type) {
    case GameStateAction.SET_SOLUTION: {
      const { payload } = action;

      return {
        ...state,
        solution: payload.toLowerCase(),
        guessedLetters: {
          correct: Array.from<string>({ length: payload.length }).fill(""),
          incorrect: initialGameState.guessedLetters.incorrect
        }
      };
    }
    case GameStateAction.GUESS_LETTER: {
      const { payload } = action;
      if (state.solution === undefined) return state;

      if (!state.solution.includes(payload)) {
        return {
          ...state,
          guessedLetters: {
            ...state.guessedLetters,
            incorrect: [...state.guessedLetters.incorrect, payload]
          }
        };
      }

      return {
        ...state,
        guessedLetters: {
          ...state.guessedLetters,
          correct: state.guessedLetters.correct.map((letter, index) => {
            if (state.solution === undefined) return letter;
            if (state.solution[index] === payload) {
              return payload;
            }
            return letter;
          })
        }
      };
    }
    case GameStateAction.INCREMENT_INCORRECT_WORD_GUESSES: {
      return {
        ...state,
        incorrectWordGuesses: state.incorrectWordGuesses + 1
      };
    }
    case GameStateAction.SET_GAME_STATUS: {
      const { payload } = action;

      return {
        ...state,
        gameStatus: payload
      };
    }
    case GameStateAction.RESET_GAME: {
      return initialGameState;
    }
    default:
      return state;
  }
};

type GameStateDispatch = Dispatch<GameStateActions>;

const useHangmanReducer = (): [GameState, GameStateDispatch] =>
  useReducer(gameStateReducer, initialGameState);

export { useHangmanReducer, GameStateAction, type GameState };
