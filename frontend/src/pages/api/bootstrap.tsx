import { NextApiRequest, NextApiResponse } from "next";
import bootstrapJson from "../../data/bootstap.json";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({ data: bootstrapJson });
};
