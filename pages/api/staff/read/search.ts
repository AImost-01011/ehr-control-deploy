import dbConnect from "../../../../utils/dbConnect";
import Staff from "../../../../models/staffModel";
import { NextApiRequest, NextApiResponse } from "next";
import { regCommand } from "../../../../models/regCommand";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //need params... searchCategory search oriId_m
  await dbConnect();

  if (req.method === "POST") {
    try {
      const searchCriteria = () => {
        let findCondition: mongoose.FilterQuery<any> = {};

        switch (req.body.searchCategory) {
          case "role":
            findCondition = {
              "miAffiliation.role": new RegExp(req.body.search),
              "miAffiliation.oriId_m": req.body.oriId_m,
            };
            break;

          case "staffName":
            findCondition = {
              $or: [
                {
                  "staffName.name": new RegExp(req.body.search),
                  "miAffiliation.oriId_m": req.body.oriId_m,
                },
                {
                  "staffName.hira": new RegExp(req.body.search),
                  "miAffiliation.oriId_m": req.body.oriId_m,
                },
              ],
            };
            break;

          case "message":
            findCondition = {
              "message.content": new RegExp(req.body.search),
              "miAffiliation.oriId_m": req.body.oriId_m,
            };
            break;

          default:
            break;
        }
        return findCondition;
      };

      Staff.find(searchCriteria(), (err, doc) => {
        if (err) return res.status(400).send(err);

        return res.status(200).send(doc);
      }).select(regCommand);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
