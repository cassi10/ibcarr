// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";

type Card = {
  src: string;
  matched: boolean;
  id: number;
};

const CardMatch: NextPage = () => {
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

  const baseCards = useMemo(
    () => [
      {
        src: "/cardmatch_images/270-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/373-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/381-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/452-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/485-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/566-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/660-200x200.jpg",
        matched: false
      },
      {
        src: "/cardmatch_images/721-200x200.jpg",
        matched: false
      }
    ],
    []
  );

  const [cards, setCards] = useState<Card[]>([]);
  const [choiceOne, setChoiceOne] = useState<Card | undefined>(undefined);
  const [choiceTwo, setChoiceTwo] = useState<Card | undefined>(undefined);
  const [tries, setTries] = useState<number>(0);
  const [gameState, setGameState] = useState<"won" | "playing">("playing");
  const [disabled, setDisabled] = useState<boolean>(false);

  const reset = (cardSet: Omit<Card, "id">[]): void => {
    setCards([]);
    setGameState("playing");
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTries(0);

    const newCards = [...cardSet, ...cardSet]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(newCards);
  };

  const resetTurn = (): void => {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTries((previousTries) => previousTries + 1);
    setDisabled(false);
  };

  useEffect(() => {
    reset(baseCards);
  }, [baseCards]);

  useEffect(() => {
    if (cards === [] || cards.length === 0) return;

    const notMatched = cards.filter((card) => !card.matched);
    if (notMatched.length === 0) setGameState("won");
  }, [choiceOne, choiceTwo, cards]);

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setDisabled(true);
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
    if (card.id === choiceOne?.id) return;
    if (card.id === choiceTwo?.id) return;
    if (disabled) return;
    if (choiceOne) {
      setChoiceTwo(card);
    } else setChoiceOne(card);
  };

  const onNewGameButtonClick = (): void => reset(baseCards);

  return (
    <>
      <Head>
        <title>Games - Card Match</title>
        <meta name="description" content="A simple card match game." />
      </Head>
      <Flex direction="column" align="center" justify="center" gridGap={4}>
        <Flex
          direction="row"
          alignSelf="start"
          align="center"
          justify="center"
          gridGap={4}
          py={8}
        >
          <Heading>Card Match</Heading>
          <Button size="sm" variant="solid" onClick={onNewGameButtonClick}>
            New Game
          </Button>
        </Flex>
        {gameState !== "playing" && (
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
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
        >
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
                maxW={imageSize}
                maxH={imageSize}
                onClick={(): void => onCardClick(card)}
                filter={gameState === "won" ? "grayscale(100%)" : "unset"}
                cursor={gameState === "won" ? "not-allowed" : "pointer"}
              >
                <Image src={imageSource} alt="" objectFit="fill" />
              </Box>
            );
          })}
        </Grid>
      </Flex>
    </>
  );
};

export default CardMatch;
