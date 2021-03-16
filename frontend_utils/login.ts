import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const login = async (authData: {
    username: string;
    password: string;
}): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/api/login",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(authData)
    };

    const response = await axios(config);
    if (response.status === 201) return true;
    else return false;
};
export default login;
