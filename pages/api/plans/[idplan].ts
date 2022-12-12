// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setTimeout } from "timers/promises";
import { PlansConstant } from "../../../constants/plans";

const data = async () => {
  const response = PlansConstant;
  await setTimeout(2000);
  return response;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "GET") {
      const { idplan } = req.query;
      let response = null;
      const results = await data();
      res.status(200).json(results);
    }
  } catch (error: any) {
    res.status(400).json(error);
  }
}
