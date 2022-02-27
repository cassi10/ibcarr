import { Dispatch, useReducer } from "react";

enum GameStatus {
  PLAYING,
  LOST,
  WON
}

type GameState = {
  solution: string | undefined;
  lettersGuesses: string[] | undefined;
  incorrectTries: number;
  status: GameStatus;
};

const initialGameState: GameState = {
  solution: undefined,
  lettersGuesses: undefined,
  incorrectTries: 0,
  status: GameStatus.PLAYING
};

enum GameStateAction {
  SET_SOLUTION,
  ADD_GUESSED_LETTER,
  INCREMENT_INCORRECT_TRIES,
  SET_STATUS,
  RESET_GAME
}

type GameStateActions =
  | {
      type: GameStateAction.SET_SOLUTION | GameStateAction.ADD_GUESSED_LETTER;
      payload: string;
    }
  | { type: GameStateAction.SET_STATUS; payload: GameState["status"] }
  | {
      type:
        | GameStateAction.INCREMENT_INCORRECT_TRIES
        | GameStateAction.RESET_GAME;
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
    case GameStateAction.ADD_GUESSED_LETTER: {
      const { payload } = action;

      const lettersGuesses = state.lettersGuesses
        ? [...state.lettersGuesses, payload]
        : [payload];

      return {
        ...state,
        lettersGuesses
      };
    }
    case GameStateAction.INCREMENT_INCORRECT_TRIES: {
      return {
        ...state,
        incorrectTries: state.incorrectTries + 1
      };
    }
    case GameStateAction.SET_STATUS: {
      const { payload } = action;

      return {
        ...state,
        status: payload
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

export { useHangmanReducer, GameStateAction, GameStatus };
