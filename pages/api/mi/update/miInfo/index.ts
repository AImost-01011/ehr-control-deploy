import dbConnect from "../../../../../utils/dbConnect";
import MI from "../../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../../models/regCommand";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... miName miHira zip_m address1_m address2_m phone_m fax_m contactEmail oriId_m department
  await dbConnect();

  if (req.method === "POST") {
    try {
      const newInfo = {
        miName: {
          name: req.body.miName,
          hira: req.body.miHira,
        },
        location: {
          zip_m: req.body.zip_m,
          address1_m: req.body.address1_m,
          address2_m: req.body.address2_m,
        },
        contact: {
          phone_m: req.body.phone_m,
          fax_m: req.body.fax_m,
          contactEmail: req.body.contactEmail,
        },
        department: req.body.department,
      };

      MI.findOneAndUpdate(
        { oriId_m: req.body.oriId_m },
        {
          $set: newInfo,
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
