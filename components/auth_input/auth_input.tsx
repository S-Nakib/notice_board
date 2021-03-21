import React from "react";
import style from "./auth_input.module.scss";

type submit = {
    type: "submit";
    disabled: boolean;
    error: boolean;
    errorText: string;
    success?: boolean;
    successText?: string;
};

type other = {
    type: "text" | "password";
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type common = {
    value: string;
};

const authInput: React.FC<(submit & common) | (other & common)> = (props) => {
    return props.type === "submit" ? (
        <>
            <input
                type="submit"
                value={props.value}
                className={`${style.authInput} ${style.submit}`}
                disabled={props.disabled}
            ></input>
            {props.error ? (
                <p className={style.error}>{props.errorText}</p>
            ) : null}
            {props.success ? (
                <p className={style.success}>{props.successText}</p>
            ) : null}
        </>
    ) : (
        <>
            <label className={style.authInput}>
                {props.type === "text" ? "Username" : "Password"}
                <input
                    type={props.type}
                    onChange={props.handler}
                    value={props.value}
                    required
                ></input>
            </label>
        </>
    );
};

export default React.memo(authInput);
