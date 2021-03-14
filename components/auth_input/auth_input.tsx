import style from "./auth_input.module.scss";

const authInput: React.FC<{
    type: "text" | "password" | "submit";
    value: string;
    handler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = (props) => {
    return props.type === "submit" ? (
        <input
            type="submit"
            value="Submit"
            className={`${style.authInput} ${style.submit}`}
        ></input>
    ) : (
        <>
            <label className={style.authInput}>
                {props.type === "text" ? "Username" : "Password"}
                <input
                    type={props.type}
                    onChange={props.handler}
                    value={props.value}
                ></input>
            </label>
        </>
    );
};

export default authInput;
