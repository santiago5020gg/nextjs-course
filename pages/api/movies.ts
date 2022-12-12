// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setTimeout } from "timers/promises";
import { MoviesConstant } from "../../constants/movies";


const data = async () => {
  const response = MoviesConstant;
  await setTimeout(2000);
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "GET") {
      const results = await data();
      res.status(200).json(results);
    }
  } catch (error:any) {
    res.status(400).json(error);
  }
}
