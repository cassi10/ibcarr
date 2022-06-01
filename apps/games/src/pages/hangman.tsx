import { getRandomWord } from "@api/words/word";
import { SEO } from "@components";
import { HangmanGameProperties } from "@games";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const HangmanGame = dynamic<HangmanGameProperties>(() =>
  import("@games").then((module_) => module_.HangmanGame)
);

const Hangman = ({ initialWord }: HangmanGameProperties): JSX.Element => {
  return (
    <>
      <SEO title="Hangman" description="A simple hangman game." />
      <HangmanGame initialWord={initialWord} />
    </>
  );
};

const getStaticProperties: GetStaticProps = () => {
  const word = getRandomWord("random");

  return {
    props: {
      initialWord: word
    }
  };
};

export { getStaticProperties as getStaticProps };
export default Hangman;
