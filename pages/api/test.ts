import dbConnect from "../../utils/dbConnect";
import MI from "../../models/miModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const mis = await MI.find({});
      res.status(200).send(mis);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
