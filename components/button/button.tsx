import style from "./button.module.scss";

const button: React.FC<{
    state: boolean;
    handler: () => void;
    children: string;
}> = (props) => {
    const classes = props.state
        ? `${style.button} ${style.clickableButton}`
        : style.button;

    return (
        <button
            type="button"
            onClick={props.handler}
            className={classes}
            disabled={!props.state}
        >
            {props.children}
        </button>
    );
};
export default button;
