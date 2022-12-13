// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { movies } from "../../lib/mongodb/movie";
import connectMongoDb from "../../models/services/mongodb/config";

type Data = {
  name: string;
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const db = await connectMongoDb();
    if (req.method === "GET") {
      const allMovies = await movies(db);
      res.status(200).json(allMovies);
    }
  } catch (error:any) {
    res.status(400).json(error);
  }
}
