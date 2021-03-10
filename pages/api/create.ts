import type { NextApiRequest, NextApiResponse } from "next";
import authorize from "../../backend_utils/authorize";
import mongodb from "../../backend_utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") res.status(405).send("Method not allowed.");
    else if (!authorize(req)) res.status(401).send("Please login first.");
    else {
        try {
            const table = await mongodb();
            await table.insertOne(JSON.parse(req.body.data));
            res.status(200).send("created");
        } catch {
            res.status(500).send("An error occured. Please try again.");
        }
    }
};
