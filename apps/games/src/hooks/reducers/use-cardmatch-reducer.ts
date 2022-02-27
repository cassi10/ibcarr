import { Dispatch, useReducer } from "react";

type Card = {
  src: string;
  matched: boolean;
  id: string;
};

type GameState = {
  cards: Card[] | undefined;
  cardChoices: {
    choiceOne: Card | undefined;
    choiceTwo: Card | undefined;
  };
  tries: number;
  playing: boolean;
  inputsDisabled: boolean;
};

const initialGameState: GameState = {
  cards: undefined,
  cardChoices: {
    choiceOne: undefined,
    choiceTwo: undefined
  },
  tries: 0,
  playing: true,
  inputsDisabled: false
};

enum GameStateAction {
  SET_CARDS,
  SET_CHOICES,
  SET_PLAYING,
  SET_INPUTS_DISABLED,
  INCREMENT_TRIES,
  NEXT_TURN,
  RESET_GAME
}

type GameStateActions =
  | {
      type: GameStateAction.SET_CARDS;
      payload: Card[];
    }
  | {
      type: GameStateAction.SET_CHOICES;
      payload: {
        choice: keyof GameState["cardChoices"];
        card: Card;
      };
    }
  | {
      type: GameStateAction.SET_PLAYING | GameStateAction.SET_INPUTS_DISABLED;
      payload: boolean;
    }
  | {
      type:
        | GameStateAction.INCREMENT_TRIES
        | GameStateAction.RESET_GAME
        | GameStateAction.NEXT_TURN;
    };

const gameStateReducer = (
  state: GameState,
  action: GameStateActions
): GameState => {
  const { type } = action;

  switch (type) {
    case GameStateAction.SET_CARDS: {
      const { payload } = action;

      return {
        ...state,
        cards: payload
      };
    }
    case GameStateAction.SET_CHOICES: {
      const { choice, card } = action.payload;

      return {
        ...state,
        cardChoices: {
          ...state.cardChoices,
          [choice]: card
        }
      };
    }
    case GameStateAction.SET_PLAYING: {
      const { payload } = action;

      return {
        ...state,
        playing: payload
      };
    }
    case GameStateAction.SET_INPUTS_DISABLED: {
      const { payload } = action;

      return {
        ...state,
        inputsDisabled: payload
      };
    }
    case GameStateAction.INCREMENT_TRIES: {
      return {
        ...state,
        tries: state.tries + 1
      };
    }
    case GameStateAction.RESET_GAME: {
      return initialGameState;
    }
    case GameStateAction.NEXT_TURN: {
      return {
        ...state,
        tries: state.tries + 1,
        cardChoices: {
          choiceOne: undefined,
          choiceTwo: undefined
        },
        inputsDisabled: false
      };
    }
    default:
      return state;
  }
};

const useCardmatchReducer = (): [GameState, Dispatch<GameStateActions>] =>
  useReducer(gameStateReducer, initialGameState);

export { useCardmatchReducer, GameStateAction, type Card };
