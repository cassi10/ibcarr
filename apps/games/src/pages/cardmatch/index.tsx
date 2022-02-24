// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-nested-ternary */
import NextImage from "next/image";
import { Box, Button, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { nanoid } from "nanoid/non-secure";
import {
  GameContainer,
  GameHeading,
  GameInformationModal,
  NewGameButton
} from "../../components";

type State = {
  cards: Card[];
  choiceOne: Card | undefined;
  choiceTwo: Card | undefined;
  tries: number;
  playing: boolean;
  inputDisabled: boolean;
};

type Card = {
  src: string;
  matched: boolean;
  id: string;
};

const CardMatch = (): JSX.Element => {
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

  const initialState = {
    cards: [],
    choiceOne: undefined,
    choiceTwo: undefined,
    tries: 0,
    playing: true,
    inputDisabled: false
  };

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

  /**
   * TODO Convert this to useReducer instead
   */
  const [cards, setCards] = useState<State["cards"]>(initialState.cards);
  const [choiceOne, setChoiceOne] = useState<State["choiceOne"]>(
    initialState.choiceOne
  );
  const [choiceTwo, setChoiceTwo] = useState<State["choiceTwo"]>(
    initialState.choiceTwo
  );
  const [tries, setTries] = useState<State["tries"]>(initialState.tries);
  const [playing, setPlaying] = useState<State["playing"]>(
    initialState.playing
  );
  const [inputDisabled, setInputDisabled] = useState<State["inputDisabled"]>(
    initialState.inputDisabled
  );

  const reset = (): void => {
    setCards(generateCardArray(cardSources));
    setChoiceOne(initialState.choiceOne);
    setChoiceTwo(initialState.choiceTwo);
    setTries(initialState.tries);
    setPlaying(initialState.playing);
    setInputDisabled(initialState.inputDisabled);
  };

  const resetTurn = (): void => {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTries((previousTries) => previousTries + 1);
    setInputDisabled(false);
  };

  useEffect(() => {
    setCards(generateCardArray(cardSources));
  }, [cardSources]);

  useEffect(() => {
    if (cards === [] || cards.length === 0) return;

    const notMatched = cards.filter((card) => !card.matched);

    if (notMatched.length === 0) setPlaying(false);
  }, [choiceOne, choiceTwo, cards]);

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setInputDisabled(true);

    if (choiceOne.src === choiceTwo.src) {
      setCards((previousCards) =>
        previousCards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          }
          return card;
        })
      );

      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  const onCardClick = (card: Card): void => {
    if (card.matched) return;
    if (card.id === choiceOne?.id || card.id === choiceTwo?.id) return;
    if (inputDisabled) return;

    if (choiceOne) {
      setChoiceTwo(card);
    } else setChoiceOne(card);
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
          {cards.map((card) => {
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
