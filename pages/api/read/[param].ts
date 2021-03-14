import type { NextApiRequest, NextApiResponse } from "next";
import mongodb from "../../../backend_utils/mongodb";

const docPerGroup = 3;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") res.status(405).send("Method not allowed.");
    else {
        try {
            const { param } = req.query;

            const group = parseInt(param as string);
            const table = await mongodb();

            const cursor = await table
                .find()
                .sort({ _id: -1 })
                .skip(group > 0 ? (group - 1) * docPerGroup : 0)
                .limit(docPerGroup);

            const docs = await cursor.toArray();

            res.status(200).json(docs);
        } catch {
            res.status(500).send("An error occured. Please try again.");
        }
    }
};
