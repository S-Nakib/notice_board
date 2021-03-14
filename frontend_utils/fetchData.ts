import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const fetchData = async (group: number): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/read/${group}`,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    const fetchedData = await axios(config);

    return fetchedData;
};

export default fetchData;
