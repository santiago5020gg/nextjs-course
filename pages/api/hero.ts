// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDb from "../../models/services/mongodb/config";

type Data = {
  name: string;
};

const hero = async (db: any) => {
  try {
    const collection = db.collection("hero");
    const findResult = await collection.findOne();
    return findResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const db = await connectMongoDb();
    if (req.method === "GET") {
      console.log('NextApiRequest jajaja');
      const results = await hero(db);
      res.status(200).json(results);
    }
  } catch (error:any) {
    res.status(400).json(error);
  }
}
