import { useContext } from "react";
import { useQuery } from "react-query";
import { LoginContext } from "../pages/_app";
import login from "../frontend_utils/login";

type propsType = {
    children: React.ReactNode;
};

const loginManager: React.FC<propsType> = (props) => {
    const { setIsLoggedIn } = useContext(LoginContext);

    useQuery(["isLoggedIn"], () => login(), {
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchOnWindowFocus: true,
        staleTime: 0,
        onSuccess: (data) => {
            setIsLoggedIn(data);
        },
        onError: () => {
            setIsLoggedIn(false);
        }
    });

    return <div>{props.children}</div>;
};

export default loginManager;
