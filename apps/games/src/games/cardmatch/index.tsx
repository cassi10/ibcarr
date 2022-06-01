import { Flex, Button, Grid, Box, Text } from "@chakra-ui/react";
import {
  GameContainer,
  GameHeading,
  NewGameButton,
  GameInformationModal
} from "@components";
import NextImage from "next/image";
import { cover, cards } from "./data/cards";
import useCardmatchGame from "./hooks/use-cardmatch-game";

const Cardmatch = (): JSX.Element => {
  const { state, functions } = useCardmatchGame(cards);

  return (
    <GameContainer>
      <GameHeading text="Card Match">
        <NewGameButton onClick={functions.handleNewGameButtonClick} />
        <GameInformationModal>
          <Text>Below you are given 8 pairs of cards.</Text>
          <Text>
            Your job is to match them all in the least amount of tries.
          </Text>
        </GameInformationModal>
      </GameHeading>
      {/* {!state.playing && ( */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        gridGap={8}
        pb={4}
      >
        <Flex direction="column" align="center" justify="center" gridGap={4}>
          <Text fontSize="4xl">
            You matched all cards in {state.tries} tries!
          </Text>
          <Button
            variant="solid"
            colorScheme="green"
            onClick={functions.handleNewGameButtonClick}
          >
            New Game
          </Button>
        </Flex>
      </Flex>
      {/* )} */}
      <Text fontSize="xl">Tries: {state.tries}</Text>
      <Grid
        gridTemplateColumns="repeat(4, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
        minHeight="min-content"
      >
        {state.cards?.map((card) => {
          let imageToDisplay = card.matched ? card.data : cover;
          if (state.cardChoices.choiceOne?.id === card.id)
            imageToDisplay = card.data;
          if (state.cardChoices.choiceTwo?.id === card.id)
            imageToDisplay = card.data;

          return (
            <Box
              maxWidth={200}
              maxHeight={200}
              key={card.id}
              onClick={
                card.matched
                  ? undefined
                  : (): void => functions.handleCardClick(card)
              }
              filter={state.playing ? "unset" : "grayscale(100%)"}
              cursor={
                state.playing
                  ? card.matched
                    ? "default"
                    : "pointer"
                  : "not-allowed"
              }
              rounded="md"
              outline="solid 1px"
              outlineOffset={-3}
              outlineColor="blue.500"
              overflow="visible"
            >
              <NextImage src={imageToDisplay} />
            </Box>
          );
        })}
      </Grid>
    </GameContainer>
  );
};

export default Cardmatch;
