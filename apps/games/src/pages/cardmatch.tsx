import { SEO } from "@components";
import { CardmatchGame } from "@games";

const Cardmatch = (): JSX.Element => {
  /**
   * TODO Replace this jank with useWindowSize hook instead
   */
  // const [
  //   minHeight1050,
  //   minHeight950,
  //   minHeight900,
  //   minHeight850,
  //   minHeight800,
  //   minHeight700
  // ] = useMediaQuery([
  //   "(min-height: 1050px)",
  //   "(min-height: 950px)",
  //   "(min-height: 900px)",
  //   "(min-height: 850px)",
  //   "(min-height: 800px)",
  //   "(min-height: 700px)"
  // ]);

  // const imageSize = minHeight1050
  //   ? "200px"
  //   : minHeight950
  //   ? "180px"
  //   : minHeight900
  //   ? "160px"
  //   : minHeight850
  //   ? "140px"
  //   : minHeight800
  //   ? "120px"
  //   : minHeight700
  //   ? "100px"
  //   : "100px";

  // useEffect(() => {
  //   if (!cards || cards.length === 0) return;

  //   const notMatched = cards.filter((card) => !card.matched);

  //   if (notMatched.length === 0)
  //     dispatch({ type: GameStateAction.SET_PLAYING, payload: false });
  // }, [cards, dispatch]);

  // useEffect(() => {
  //   if (!choiceOne || !choiceTwo || !cards) return;

  //   dispatch({ type: GameStateAction.SET_INPUTS_DISABLED, payload: true });
  //   if (choiceOne.src === choiceTwo.src) {
  //     dispatch({
  //       type: GameStateAction.SET_CARDS,
  //       payload: cards.map((card) => {
  //         if (card.src === choiceOne.src) return { ...card, matched: true };

  //         return card;
  //       })
  //     });

  //     resetTurn();
  //   } else {
  //     setTimeout(() => resetTurn(), 1000);
  //   }
  // }, [choiceOne, choiceTwo, cards, dispatch, resetTurn]);

  return (
    <>
      <SEO title="Card Match" description="A simple card match game." />
      <CardmatchGame />
    </>
  );
};

export default Cardmatch;
