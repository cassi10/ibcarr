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

enum GameStatus {
  PLAYING,
  LOST,
  WON
}

type Letter = {
  char: string;
  state: LetterState;
};

type Word = Letter[];

type GameState = {
  solution: string | undefined;
  guessedWords: Word[];
  currentRow: number;
  error: GameErrors | undefined;
  status: GameStatus;
};

const initialGameState: GameState = {
  solution: undefined,
  guessedWords: [],
  currentRow: 0,
  error: undefined,
  status: GameStatus.PLAYING
};

enum GameStateAction {
  SET_SOLUTION,
  SET_GUESSED_WORDS,
  ADD_GUESSED_WORD,
  INCREMENT_ROW,
  SET_ERROR,
  SET_STATUS,
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
      payload: Word[];
    }
  | {
      type: GameStateAction.SET_ERROR;
      payload: GameErrors | undefined;
    }
  | {
      type: GameStateAction.SET_STATUS;
      payload: GameState["status"];
    }
  | {
      type:
        | GameStateAction.RESET_GAME
        | GameStateAction.NEXT_TURN
        | GameStateAction.INCREMENT_ROW;
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
        guessedWords: payload
      };
    }
    case GameStateAction.ADD_GUESSED_WORD: {
      const { payload } = action;

      const newGuessedWords = [...state.guessedWords];
      newGuessedWords[state.currentRow] = payload;

      return {
        ...state,
        guessedWords: [...newGuessedWords]
      };
    }
    case GameStateAction.SET_STATUS: {
      const { payload } = action;

      return {
        ...state,
        status: payload
      };
    }
    case GameStateAction.SET_ERROR: {
      const { payload } = action;

      return {
        ...state,
        error: payload
      };
    }
    case GameStateAction.INCREMENT_ROW: {
      return {
        ...state,
        currentRow: state.currentRow + 1
      };
    }
    case GameStateAction.NEXT_TURN: {
      return {
        ...state,
        currentRow: state.currentRow + 1
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
  GameStatus,
  GameErrors,
  type Word,
  type Letter
};
