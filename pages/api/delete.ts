import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectID } from "mongodb";
import authorize from "../../backend_utils/authorize";
import mongodb from "../../backend_utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE") res.status(405).send("Method not allowed.");
    else if (!authorize(req)) res.status(401).send("Please login first.");
    else {
        try {
            const table = await mongodb();
            const deleted = await table.deleteOne({
                _id: new ObjectID(req.body._id)
            });

            if (deleted.deletedCount === 1) res.status(200).send(req.body._id);
            else res.status(200).send("");
        } catch {
            res.status(500).send("An error occured. Please try again.");
        }
    }
};
