import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "../../backend_utils/authenticate";
import { generateJWT } from "../../backend_utils/jwt";
import { cookieMaxAge } from "../../_globals";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (authenticate(req) === false) res.status(401).send("Login Failed");
    else {
        const jwt = generateJWT();

        res.setHeader(
            "Set-Cookie",
            `sessionID=${jwt}; Max-Age=${cookieMaxAge}; HttpOnly; Secure` //
        );

        res.status(201).send({ name: "Login Successful" });
    }
};
