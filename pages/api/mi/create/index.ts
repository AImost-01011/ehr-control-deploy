import dbConnect from "../../../../utils/dbConnect";
import MI from "../../../../models/miModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const id = nanoid();
    try {
      const newMiAccount = {
        miName: {
          name: req.body.miName,
          hira: req.body.miHira,
        },
        oriId_m: id,
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
        notice_m: [],
        businessContact: [],
        department: [],
        reservation_m: [],
      };

      MI.updateOne(
        { email: req.body.email_m },
        { $set: newMiAccount },
        { new: true },
        (err, doc) => {
          if (err) res.send(err);

          if (doc.ok) res.status(200).send("ok");
          else res.status(402).send("create new mi failed");
        }
      );
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
