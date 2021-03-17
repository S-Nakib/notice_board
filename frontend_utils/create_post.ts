import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const create_post = async (data: {
    title: string;
    content: string;
}): Promise<boolean> => {
    if (!data.title || !data.content) return false;
    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/api/create",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    };

    const response = await axios(config);
    return response.status === 201;
};
export default create_post;
