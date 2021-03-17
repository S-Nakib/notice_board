import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { LoginContext } from "../pages/_app";
import login from "../frontend_utils/login";

type propsType = {
    children: React.ReactNode;
};

const loginManager: React.FC<propsType> = (props) => {
    const { setIsLoggedIn } = useContext(LoginContext);

    const {
        isSuccess: loginIsSuccess,
        isFetching: loginIsFetching,
        data: loginData
    } = useQuery(["isLoggedIn"], () => login(), {
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        staleTime: 0
    });

    useEffect(() => {
        if (!loginIsFetching && loginIsSuccess && loginData)
            setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, [loginIsFetching]);

    return <div>{props.children}</div>;
};

export default loginManager;
