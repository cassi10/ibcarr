/**
 * export { state: {}, functions: [] }
 * https://jaketrent.com/post/naming-event-handlers-react
 */

import { nanoid } from "nanoid/non-secure";
import { useCallback, useEffect } from "react";
import {
  GameStateAction,
  useCardmatchReducer,
  Card,
  GameState
} from "./use-cardmatch-reducer";

const useCardmatchGame = (
  _cards: Card["data"][]
): {
  state: GameState;
  functions: {
    startNewGame: (cardSet: Card["data"][], shouldResetGame: boolean) => void;
    handleNewGameButtonClick: () => void;
    handleCardClick: (card: Card) => void;
  };
} => {
  const [state, dispatch] = useCardmatchReducer();

  const createCardArray = (cardSet: Card["data"][]): Card[] =>
    [...cardSet, ...cardSet]
      .map((card) => {
        return {
          data: card,
          matched: false,
          id: nanoid()
        };
      })
      .sort(() => Math.random() - 0.5);

  const startNewGame = useCallback(
    (cardSet: Card["data"][], shouldResetGame: boolean): void => {
      const cards = createCardArray(cardSet);

      if (shouldResetGame) {
        dispatch({
          type: GameStateAction.RESET_GAME
        });
      }

      dispatch({
        type: GameStateAction.SET_CARDS,
        payload: cards
      });
    },
    [dispatch]
  );

  useEffect(() => {
    startNewGame(_cards, false);
  }, [startNewGame, _cards]);

  const handleNewGameButtonClick = (): void => startNewGame(_cards, true);

  const handleCardClick = (card: Card): void => {
    if (state.inputsDisabled) return;
    if (state.cardChoices.choiceTwo !== undefined) return;

    dispatch({
      type: GameStateAction.SET_CHOICES,
      payload: {
        choice:
          state.cardChoices.choiceOne !== undefined ? "choiceTwo" : "choiceOne",
        card
      }
    });
  };

  return {
    state,
    functions: {
      startNewGame,
      handleNewGameButtonClick,
      handleCardClick
    }
  };
};

export default useCardmatchGame;
