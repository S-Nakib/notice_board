import type { NextApiRequest, NextApiResponse } from "next";
import mongodb from "../../backend_utils/mongodb";

const docPerPage = 3;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") res.status(405).send("Method not allowed.");
    else {
        try {
            const table = await mongodb();

            const page = parseInt(req.body.page);

            const cursor = await table
                .find()
                .sort({ _id: -1 })
                .skip(page > 0 ? (page - 1) * docPerPage : 0)
                .limit(docPerPage);

            const docs = await cursor.toArray();

            res.status(200).json({ data: JSON.stringify(docs) });
        } catch {
            res.status(500).send("An error occured. Please try again.");
        }
    }
};
