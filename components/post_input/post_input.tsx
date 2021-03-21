import React from "react";
import style from "./post_input.module.scss";

type propsType = Readonly<{
    titleHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    titleValue: string;
    contentHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    contentValue: string;
}>;

const postInput: React.FC<propsType> = (props) => (
    <div className={style.box}>
        <textarea
            maxLength={300}
            className={style.titleInput}
            placeholder="Title"
            spellCheck={true}
            value={props.titleValue}
            onChange={props.titleHandler}
            required
        ></textarea>
        <textarea
            maxLength={10000}
            className={style.contentInput}
            placeholder="Content"
            spellCheck={true}
            value={props.contentValue}
            onChange={props.contentHandler}
            required
        ></textarea>
    </div>
);
export default React.memo(postInput);
