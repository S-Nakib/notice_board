import type { NextApiRequest, NextApiResponse } from "next";
import authorize from "../../backend_utils/authorize";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST" || !authorize(req))
        res.status(401).send("Logout Failed");
    else {
        res.setHeader("Set-Cookie", `sessionID=""; Max-Age=${-1}; HttpOnly`);
        res.status(200).send("Logout Successful");
    }
};
