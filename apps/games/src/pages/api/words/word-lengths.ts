import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import words from "./words.json";

const getWordLengths = (allowRandom: boolean): string[] => {
  const lengths = Object.keys(words);

  if (allowRandom) lengths.push("random");

  return lengths;
};

const handler = (request: NextApiRequest, response: NextApiResponse): void => {
  if (request.method !== "GET") return;

  const { allowRandom } = request.query;

  const wordLengths = getWordLengths(allowRandom !== undefined);

  response.status(StatusCodes.OK).json({ wordLengths });
};

export { getWordLengths };
export default handler;
