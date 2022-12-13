// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getMoviesFromMongoDb } from "../../lib/mongodb/movie";
import connectMongoDb from "../../models/services/mongodb/config";

type Data = {
  name: string;
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      const allMovies = await getMoviesFromMongoDb();
      res.status(200).json(allMovies);
    }
  } catch (error:any) {
    res.status(400).json(error);
  }
}
