import jwt from "jsonwebtoken";
import { cookieMaxAge } from "../_globals";

const userData = "admin";
const secretKey = "fjlsareojikherj33h3l3h33hio3ho343ojfsfdsfds453543gds43";

export const generateJWT = () =>
    jwt.sign({ userData }, secretKey, { expiresIn: cookieMaxAge });

export const verifyJWT = (token: string): boolean => {
    try {
        const data = jwt.verify(token, secretKey);
        if (typeof data !== "object") return false;
        if ((data as any)?.userData !== userData) return false;
        return true;
    } catch {
        return false;
    }
};
