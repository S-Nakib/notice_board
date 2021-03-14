import { useState } from "react";
import AuthInput from "../components/auth_input/auth_input";

const login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <form
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
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

            <AuthInput type="submit" value="Submit"></AuthInput>
        </form>
    );
};

export default login;
