import { NextApiRequest, NextApiResponse } from "next";
import { WordLengths } from "./types";
import words from "./words.json";

const handler = (request: NextApiRequest, response: NextApiResponse): void => {
  if (request.method !== "GET") return;

  const { word } = request.query as { word: string };

  const wordLengths = Object.keys(words);
  const minWordLength = Number.parseInt(wordLengths[0], 10);
  const maxWordLength = Number.parseInt(
    wordLengths[wordLengths.length - 1],
    10
  );

  if (!word) {
    response.status(400).json({ error: "You must provide a word to validate" });
  } else if (word.length < minWordLength || word.length > maxWordLength) {
    response.status(400).json({
      error: `Length must be a number between ${minWordLength} and ${maxWordLength}`
    });
  } else {
    const isWordValid = words[word.length.toString() as WordLengths].includes(
      word.toLowerCase()
    );

    response.status(200).json({ valid: isWordValid });
  }
};

export default handler;
