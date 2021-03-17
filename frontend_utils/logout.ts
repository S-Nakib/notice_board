import axios from "axios";

const logout = async () => {
    const response = await axios.post("/api/logout");
    return response.status === 200;
};

export default logout;
