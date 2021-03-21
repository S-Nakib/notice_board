import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectID } from "mongodb";
import authorize from "../../backend_utils/authorize";
import mongodb from "../../backend_utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PUT") res.status(405).send("Method not allowed.");
    else if (!authorize(req)) res.status(401).send("Please login first.");
    else {
        try {
            const table = await mongodb();
            await table.replaceOne(
                {
                    _id: new ObjectID(req.body._id)
                },
                {
                    title: req.body.title,
                    content: req.body.content
                }
            );

            res.status(200).send("updated");
        } catch (e) {
            console.log(e);
            res.status(500).send("An error occurred. Please try again.");
        }
    }
};
