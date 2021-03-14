import { useState } from "react";
import AuthInput from "../components/auth_input/auth_input";
import Button from "../components/button/button";
import { buttonStateType } from "../types";
import { buttonStates } from "../globals";

const login: React.FC = () => {
    const [buttonState, setButtonState] = useState<buttonStateType>(
        buttonStates.submit
    );

    return (
        <div>
            <AuthInput type="text"></AuthInput>
            <AuthInput type="password"></AuthInput>
            <Button
                state={buttonState.state}
                handler={() => {
                    setButtonState(buttonStates.loading);
                }}
            >
                {buttonState.message}
            </Button>
        </div>
    );
};

export default login;
