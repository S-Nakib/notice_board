import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { noticeType } from "../types";

const updatePost = async (notice: noticeType): Promise<noticeType> => {
    let config: AxiosRequestConfig = {
        method: "put",
        url: "/api/update",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(notice)
    };

    const response = await axios(config);

    if (response.status === 200) return notice;

    return notice;
};

export default updatePost;
