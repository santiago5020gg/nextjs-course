// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addContactInMongoDb } from "../../lib/mongodb/contact";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    console.log("carechimba");
    if (req.method === "POST") {
      const name = req.body.name;
      const message = req.body.message;
      const contact = { name, message };
      const response = await addContactInMongoDb(contact);
      res.status(200).json(response);
    }
  } catch (error: any) {
    res.status(400).json({ message: "something bad", error });
  }
}
