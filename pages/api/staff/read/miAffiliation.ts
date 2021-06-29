import dbConnect from "../../../../utils/dbConnect";
import Staff from "../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... oriId_m
  await dbConnect();

  if (req.method === "POST") {
    try {
      Staff.find({ "miAffiliation.oriId_m": req.body.oriId_m }, (err, doc) => {
        if (err) return res.status(400).send(err);

        return res.status(200).send(doc);
      }).select(regCommand);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
