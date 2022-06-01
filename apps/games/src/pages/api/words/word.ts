import { NextApiRequest, NextApiResponse } from "next";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import words from "./words.json";
import { WordLengths } from "./types";

// Adapted from https://github.com/chancejs/chancejs/blob/fedf92e9a896099de0063543b37af11c832ea469/chance.js#L719
const getRandomWordLength = (): WordLengths => {
  const wordLengths = Object.keys(words) as Array<WordLengths>;

  const weightsArray = wordLengths.map(
    (wordLength) => words[wordLength].length
  );
  const sumOfWeights = weightsArray.reduce((a, b) => a + Math.max(b, 0), 0);

  // Random number within range of sumOfWeights
  const randomNumber = Math.random() * sumOfWeights;

  let total = 0;
  let chosenIndex: WordLengths = "5";

  for (const [index, element] of weightsArray.entries()) {
    total += element;
    if (randomNumber <= total) {
      chosenIndex = index.toString() as WordLengths;
      break;
    }
  }

  return wordLengths[chosenIndex];
};

const getRandomWord = (_length: WordLengths | "random"): string => {
  const length = _length === "random" ? getRandomWordLength() : _length;

  return words[length][Math.floor(Math.random() * words[length].length)];
};

const handler = (request: NextApiRequest, response: NextApiResponse): void => {
  if (request.method !== "GET") return;

  const { length } = request.query as { length: WordLengths | "random" };

  if (!length || length.length <= 0)
    response.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message: ReasonPhrases.BAD_REQUEST,
        detail: "No length was provided"
      }
    });

  const lengthAsNumber = Number.parseInt(length, 10);
  const wordLengths = Object.keys(words);
  const minWordLength = Number.parseInt(wordLengths[0], 10);
  const maxWordLength = Number.parseInt(
    wordLengths[wordLengths.length - 1],
    10
  );

  if (
    (Number.isNaN(lengthAsNumber) && length !== "random") ||
    lengthAsNumber < minWordLength ||
    lengthAsNumber > maxWordLength
  ) {
    response.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message: ReasonPhrases.BAD_REQUEST,
        detail: `The length must be between ${minWordLength} and ${maxWordLength} or random`
      }
    });
  }

  response.status(StatusCodes.OK).json({ word: getRandomWord(length) });
};

export { getRandomWord };
export default handler;
