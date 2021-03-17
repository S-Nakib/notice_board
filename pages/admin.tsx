import { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { LoginContext } from "./_app";
import login from "../frontend_utils/login";
import logout from "../frontend_utils/logout";
import AuthInput from "../components/auth_input/auth_input";

const adminPage: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {
        isLoading: loginIsLoading,
        isError: loginIsError,
        isSuccess: loginIsSuccess,
        isFetching: loginIsFetching,

        data: loginData,
        refetch: loginRefetch
    } = useQuery(["login"], () => login({ username, password }), {
        enabled: false
    });

    const {
        isLoading: logoutIsLoading,
        isError: logoutIsError,
        isSuccess: logoutIsSuccess,
        isFetching: logoutIsFetching,
        data: logoutData,
        refetch: logoutRefetch
    } = useQuery(["logout"], () => logout(), {
        enabled: false
    });

    useEffect(() => {
        if (!loginIsFetching && loginIsSuccess && loginData)
            setIsLoggedIn(true);
    }, [loginIsFetching]);

    useEffect(() => {
        if (!logoutIsFetching && logoutIsSuccess && logoutData)
            setIsLoggedIn(false);
    }, [logoutIsFetching]);

    return (
        <>
            {isLoggedIn ? (
                <form
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        logoutRefetch();
                    }}
                >
                    <h1>After logging out you can only read notices.</h1>
                    <AuthInput
                        type="submit"
                        value={logoutIsLoading ? "Loading..." : "Logout"}
                        disabled={logoutIsLoading}
                        error={logoutIsError}
                    ></AuthInput>
                </form>
            ) : (
                <form
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        loginRefetch();
                    }}
                >
                    <AuthInput
                        type="text"
                        handler={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value ?? "");
                        }}
                        value={username}
                    ></AuthInput>
                    <AuthInput
                        type="password"
                        handler={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value ?? "");
                        }}
                        value={password}
                    ></AuthInput>

                    <AuthInput
                        type="submit"
                        value={loginIsLoading ? "Loading" : "Login"}
                        disabled={loginIsLoading}
                        error={loginIsError}
                        errorText=" An error occured. Please try again with correct username
                        and password."
                    ></AuthInput>
                </form>
            )}
        </>
    );
};

export default adminPage;
