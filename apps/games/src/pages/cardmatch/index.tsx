// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-nested-ternary */
import NextImage from "next/image";
import { Box, Button, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import { nanoid } from "nanoid/non-secure";
import {
  GameContainer,
  GameHeading,
  GameInformationModal,
  NewGameButton
} from "@components";
import {
  useCardmatchReducer,
  GameStateAction,
  type Card
} from "@reducers/use-cardmatch-reducer";

const CardMatch = (): JSX.Element => {
  const [
    {
      cards,
      cardChoices: { choiceOne, choiceTwo },
      inputsDisabled,
      playing,
      tries
    },
    dispatch
  ] = useCardmatchReducer();
  /**
   * TODO Replace this jank with useWindowSize hook instead
   */
  const [
    minHeight1050,
    minHeight950,
    minHeight900,
    minHeight850,
    minHeight800,
    minHeight700
  ] = useMediaQuery([
    "(min-height: 1050px)",
    "(min-height: 950px)",
    "(min-height: 900px)",
    "(min-height: 850px)",
    "(min-height: 800px)",
    "(min-height: 700px)"
  ]);

  const imageSize = minHeight1050
    ? "200px"
    : minHeight950
    ? "180px"
    : minHeight900
    ? "160px"
    : minHeight850
    ? "140px"
    : minHeight800
    ? "120px"
    : minHeight700
    ? "100px"
    : "100px";

  const cover = "/cardmatch_images/cover.png";

  /**
   * TODO Make images dynamic from some API, maybe Google Images or Unsplash or something. use these as fallback
   */
  const cardSources = useMemo(() => {
    return [
      "/cardmatch_images/270-200x200.jpg",
      "/cardmatch_images/373-200x200.jpg",
      "/cardmatch_images/381-200x200.jpg",
      "/cardmatch_images/452-200x200.jpg",
      "/cardmatch_images/485-200x200.jpg",
      "/cardmatch_images/566-200x200.jpg",
      "/cardmatch_images/660-200x200.jpg",
      "/cardmatch_images/721-200x200.jpg"
    ];
  }, []);

  const generateCardArray = (cardSet: string[]): Card[] => {
    return [...cardSet, ...cardSet]
      .map<Card>((card) => {
        return {
          src: card,
          matched: false,
          id: nanoid()
        };
      })
      .sort(() => Math.random() - 0.5);
  };

  const reset = (): void => {
    dispatch({
      type: GameStateAction.RESET_GAME
    });
    dispatch({
      type: GameStateAction.SET_CARDS,
      payload: generateCardArray(cardSources)
    });
  };

  const resetTurn = useCallback((): void => {
    dispatch({
      type: GameStateAction.RESET_TURN
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GameStateAction.SET_CARDS,
      payload: generateCardArray(cardSources)
    });
  }, [cardSources, dispatch]);

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    const notMatched = cards.filter((card) => !card.matched);

    if (notMatched.length === 0)
      dispatch({ type: GameStateAction.SET_PLAYING, payload: false });
  }, [cards, dispatch]);

  useEffect(() => {
    if (!choiceOne || !choiceTwo || !cards) return;

    dispatch({ type: GameStateAction.SET_INPUTS_DISABLED, payload: true });
    if (choiceOne.src === choiceTwo.src) {
      dispatch({
        type: GameStateAction.SET_CARDS,
        payload: cards.map((card) => {
          if (card.src === choiceOne.src) return { ...card, matched: true };

          return card;
        })
      });

      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo, cards, dispatch, resetTurn]);

  const onCardClick = (card: Card): void => {
    if (card.matched) return;
    if (card.id === choiceOne?.id || card.id === choiceTwo?.id) return;
    if (inputsDisabled) return;

    dispatch({
      type: GameStateAction.SET_CHOICES,
      payload: {
        choice: choiceOne ? "choiceTwo" : "choiceOne",
        card
      }
    });
  };

  const onNewGameButtonClick = (): void => reset();

  return (
    <>
      <Head>
        <title>Games - Card Match</title>
        <meta name="description" content="A simple card match game." />
      </Head>
      <GameContainer>
        <GameHeading text="Card Match">
          <NewGameButton onClick={onNewGameButtonClick} text="New Game" />
          <GameInformationModal>
            <Text>Below you are given 8 pairs of cards.</Text>
            <Text>
              Your job is to match them all in the least amount of tries.
            </Text>
          </GameInformationModal>
        </GameHeading>
        {!playing && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            gridGap={8}
            pb={4}
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              gridGap={4}
            >
              <Text fontSize="4xl">
                You matched all cards in {tries} tries!
              </Text>
              <Button
                variant="solid"
                colorScheme="green"
                onClick={onNewGameButtonClick}
              >
                New Game
              </Button>
            </Flex>
          </Flex>
        )}
        <Text fontSize="xl">Tries: {tries}</Text>
        <Grid gridTemplateColumns="repeat(4, 1fr)" placeItems="center" gap={2}>
          {cards?.map((card) => {
            let imageSource = cover;
            if (card.matched) imageSource = card.src;
            if (choiceOne?.src === card.src && choiceOne?.id === card.id)
              imageSource = card.src;
            if (choiceTwo?.src === card.src && choiceTwo?.id === card.id)
              imageSource = card.src;

            return (
              <Box
                key={card.id}
                background="whiteAlpha.100"
                boxSize={imageSize}
                onClick={(): void => onCardClick(card)}
                filter={!playing ? "grayscale(100%)" : "unset"}
                cursor={!playing ? "not-allowed" : "pointer"}
                rounded="md"
                shadow="md"
                overflow="hidden"
              >
                <NextImage
                  src={imageSource}
                  width={imageSize}
                  height={imageSize}
                />
              </Box>
            );
          })}
        </Grid>
      </GameContainer>
    </>
  );
};

export default CardMatch;
