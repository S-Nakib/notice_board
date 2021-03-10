import type { NextApiRequest, NextApiResponse } from "next";
import authorize from "../../backend_utils/authorize";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (!authorize(req)) res.status(401).send("Logout Failed");
    else {
        res.setHeader(
            "Set-Cookie",
            `sessionID=""; Max-Age=${-1}; HttpOnly` //; Secure
        );
        res.status(201).send("Logout Successful");
    }
};
