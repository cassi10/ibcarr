import Head from "next/head";
import { Text } from "@chakra-ui/react";
import {
  GameContainer,
  GameHeading,
  GameInformationModal,
  NewGameButton
} from "@components";

const Werdle = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Games - Werdle</title>
        <meta name="description" content="A hangman game." />
      </Head>
      <GameContainer>
        <GameHeading text="Werdle">
          <NewGameButton onClick={(): void => {}} text="New Game" />
          <GameInformationModal>
            <Text>A random 5 letter word will be selected.</Text>
            <Text>
              Your job is to guess the word in 6 tries by guessing other valid 5
              letter words.
            </Text>
            <Text>After each guess the colour of the tiles will change.</Text>
            <Text>
              A green letter means that the letter and position are correct.
            </Text>
            <Text>
              An orange letter means that the letter is correct but the position
              is not.
            </Text>
            <Text>A gray letter means that the letter is not correct.</Text>
          </GameInformationModal>
        </GameHeading>
      </GameContainer>
    </>
  );
};

export default Werdle;
