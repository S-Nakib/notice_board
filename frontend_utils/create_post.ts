import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { noticeType } from "../types";

const create_post = async (data: {
    title: string;
    content: string;
}): Promise<noticeType> => {
    if (!data.title || !data.content) throw new Error();

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/api/create",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(data)
    };

    const response = await axios(config);

    if (response.status === 201) {
        return {
            _id: response.data,
            title: data.title,
            content: data.content
        };
    } else throw new Error();
};

export default create_post;
