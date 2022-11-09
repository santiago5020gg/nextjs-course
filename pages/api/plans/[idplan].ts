// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDb from "../../../models/services/mongodb/config";

type Data = {
  name: string;
};

const plans = async (db: any, idplan: string | string[] | undefined) => {
  try {
    const collection = db.collection("plans");
    const findResult = await collection
      .find({})
      .limit(Number(idplan))
      .toArray();
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
      const { idplan } = req.query;
      const results = await plans(db, idplan);
      res.status(200).json(results);
    }
  } catch (error: any) {
    res.status(400).json(error);
  }
}
