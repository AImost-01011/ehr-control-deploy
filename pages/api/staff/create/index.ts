import dbConnect from "../../../../utils/dbConnect";
import Staff from "../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... lastName, firstName, lasthira, firstHira, oriId_m, role, email_s
  await dbConnect();

  if (req.method === "POST") {
    const id = nanoid();
    try {
      const newStaffAccount = {
        navListSave: [],
        oriId_s: id,
        staffName: {
          name: `${req.body.lastName} ${req.body.firstName}`,
          hira: `${req.body.lastHira} ${req.body.firstHira}`,
        },
        miAffiliation: [{ oriId_m: req.body.oriId_m, role: req.body.role }],
        message: {
          content: "",
          update: 0,
        },
        workSpace: {
          mi: "",
          space: "",
        },
        lastLogin: 0,
        isLogin: false,
      };

      Staff.findOne(
        {
          email: req.body.email_s,
          "staffName.name": `${req.body.lastName} ${req.body.firstName}`,
        },
        (err, doc) => {
          if (err) return res.send(err);
          if (doc === null) {
            Staff.updateOne(
              { email: req.body.email_s },
              { $set: newStaffAccount },
              {},
              (err1, doc1) => {
                if (err1) return res.send(err1);
                if (doc1.ok) return res.status(200).send("ok");
                else return res.status(400).send("create new staff failed");
              }
            );
          } else {
            Staff.updateOne(
              { oriId_s: doc.oriId_s },
              {
                $push: {
                  miAffiliation: {
                    // @ts-ignore
                    oriId_m: req.body.oriId_m,
                    //@ts-ignore
                    role: req.body.role,
                  },
                },
              },
              {},
              (err2, doc2) => {
                if (err2) return res.send(err2);
                if (doc2.ok) return res.status(200).send("add staff ok");
                else return res.status(400).send("add staff failed");
              }
            );
          }
        }
      );
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
