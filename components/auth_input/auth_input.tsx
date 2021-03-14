import style from "./auth_input.module.scss";

const authInput: React.FC<{ type: "text" | "password" }> = (props) => (
    <div className={style.div}>
        <label>{props.type === "text" ? "Username" : "Password"}</label>
        <input type={props.type}></input>
    </div>
);
export default authInput;
