import GameStatus from "@enums/game-status";
import { Dispatch, useReducer } from "react";

enum GameErrors {
  INVALID_WORD = "Not in the word list.",
  WORD_TOO_SHORT = "Not enough letters."
}

enum LetterState {
  UNKNOWN,
  INCORRECT,
  VALID,
  CORRECT
}

type Letter = {
  char: string;
  state: LetterState;
};

type Word = Letter[];

type GameState = {
  solution: string | undefined;
  guesses: Word[];
  turn: number;
  gameStatus: GameStatus;
};

const initialGameState: GameState = {
  solution: undefined,
  guesses: [],
  turn: 0,
  gameStatus: GameStatus.PLAYING
};

enum GameStateAction {
  SET_SOLUTION,
  SET_GUESSED_WORDS,
  ADD_GUESSED_WORD,
  SET_GAME_STATUS,
  NEXT_TURN,
  RESET_GAME
}

type GameStateActions =
  | {
      type: GameStateAction.SET_SOLUTION;
      payload: string;
    }
  | {
      type: GameStateAction.ADD_GUESSED_WORD;
      payload: Word;
    }
  | {
      type: GameStateAction.SET_GUESSED_WORDS;
      payload: GameState["guesses"];
    }
  | {
      type: GameStateAction.SET_GAME_STATUS;
      payload: GameState["gameStatus"];
    }
  | {
      type: GameStateAction.RESET_GAME | GameStateAction.NEXT_TURN;
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
        solution: payload
      };
    }
    case GameStateAction.SET_GUESSED_WORDS: {
      const { payload } = action;

      return {
        ...state,
        guesses: payload
      };
    }
    case GameStateAction.ADD_GUESSED_WORD: {
      const { payload } = action;

      const newGuessedWords = [...state.guesses];
      newGuessedWords[state.turn] = payload;

      return {
        ...state,
        guesses: [...newGuessedWords]
      };
    }
    case GameStateAction.SET_GAME_STATUS: {
      const { payload } = action;

      return {
        ...state,
        gameStatus: payload
      };
    }
    case GameStateAction.NEXT_TURN: {
      return {
        ...state,
        turn: state.turn + 1
      };
    }
    case GameStateAction.RESET_GAME: {
      return initialGameState;
    }
    default:
      return state;
  }
};

const useWerdleReducer = (): [GameState, Dispatch<GameStateActions>] =>
  useReducer(gameStateReducer, initialGameState);

export {
  useWerdleReducer,
  GameStateAction,
  LetterState,
  GameErrors,
  type Word,
  type Letter,
  type GameState
};
