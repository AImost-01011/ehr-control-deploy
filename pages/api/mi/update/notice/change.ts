import dbConnect from "../../../../../utils/dbConnect";
import MI from "../../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... title content oriId_m update
  await dbConnect();

  if (req.method === "POST") {
    try {
      MI.findOneAndUpdate(
        { oriId_m: req.body.oriId_m, "notice_m.update": req.body.update },
        {
          $set: {
            "notice_m.$.title": req.body.title,
            "notice_m.$.update": Date.now(),
            "notice_m.$.content": req.body.content,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) res.send(err);

          return res.status(200).send(doc);
        }
      ).select(regCommand);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
