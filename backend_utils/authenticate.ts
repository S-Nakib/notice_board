//Checks if user is eligible for log in.
import type { NextApiRequest } from "next";

const username = "admin",
    password = "fsfdlsdflsfd";

export default (req: NextApiRequest): boolean => {
    return (
        !req.cookies.sessionID &&
        req.method === "POST" &&
        req.body?.username === username &&
        req.body?.password === password
    );
};
