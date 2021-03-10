//Checks if user is eligible for log in.
import type { NextApiRequest } from "next";

const username = "admin",
    password = "fsfdlsdflsfd";

export default (req: NextApiRequest): boolean => {
    return (
        Object.keys(req.cookies).length === 0 &&
        req.method === "POST" &&
        req.body?.username === username &&
        req.body?.password === password
    );
};
