import { getRandomWord } from "@api/words/word";
import { getWordLengths } from "@api/words/word-lengths";
import { SEO } from "@components";
import { WerdleGameProperties } from "@games";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const WerdleGame = dynamic<WerdleGameProperties>(() =>
  import("@games").then((module_) => module_.WerdleGame)
);

const Werdle = ({
  initialWord,
  allowedWordLengths
}: WerdleGameProperties): JSX.Element => {
  return (
    <>
      <SEO title="Werdle" description="A werdle game." />
      <WerdleGame
        initialWord={initialWord}
        allowedWordLengths={allowedWordLengths}
      />
    </>
  );
};

const getStaticProperties: GetStaticProps = () => {
  const word = getRandomWord("5");
  const wordLengths = getWordLengths(false);

  return {
    props: {
      initialWord: word,
      allowedWordLengths: wordLengths.map((value) => Number.parseInt(value, 10))
    }
  };
};

export { getStaticProperties as getStaticProps };
export default Werdle;
