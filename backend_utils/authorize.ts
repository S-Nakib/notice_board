//Checks if user is already logged in.
import type { NextApiRequest } from "next";
import { verifyJWT } from "../backend_utils/jwt";

export default (req: NextApiRequest): boolean => {
    return !!req.cookies?.sessionID && verifyJWT(req.cookies.sessionID);
};
