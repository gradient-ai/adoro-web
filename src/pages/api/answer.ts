import { NextApiRequest, NextApiResponse } from "next";

export default async function createMeme(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return { answer: 42 };
}
