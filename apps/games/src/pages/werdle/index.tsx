import Head from "next/head";
import { GameContainer, GameHeading, NewGameButton } from "../../components";

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
        </GameHeading>
      </GameContainer>
    </>
  );
};

export default Werdle;
