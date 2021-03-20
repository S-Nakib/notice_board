import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const deletePost = async (id: string) => {
    let config: AxiosRequestConfig = {
        method: "delete",
        url: "/api/delete",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify({ _id: id })
    };

    const response = await axios(config);

    if (response.status === 200) return response.data;
    else throw new Error();
};
export default deletePost;
