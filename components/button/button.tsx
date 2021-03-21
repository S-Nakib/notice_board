import React from "react";
import style from "./button.module.scss";

const button: React.FC<{
    state: boolean;
    handler: () => void;
    value: string;
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
            {props.value}
        </button>
    );
};
export default React.memo(button);
