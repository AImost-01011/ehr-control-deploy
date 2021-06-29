import dbConnect from "../../../../utils/dbConnect";
import Staff from "../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params...
  await dbConnect();

  const { oriId_s } = req.query;

  if (req.method === "GET") {
    try {
      Staff.findOne(
        {
          oriId_s: oriId_s,
        },
        (err, doc) => {
          if (err) return res.status(400).send(err);

          return res.status(200).send(doc);
        }
      ).select(regCommand);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
