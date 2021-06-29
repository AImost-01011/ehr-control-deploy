import dbConnect from "../../../../utils/dbConnect";
import MI from "../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { email_m } = req.query;

  if (req.method === "GET") {
    try {
      const mi = await MI.findOne({ email: email_m }).select(regCommand);
      res.status(200).send(mi);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
