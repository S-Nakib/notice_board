import {} from "react";
import style from "./post_input.module.scss";

type propsType = Readonly<{
    titleHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    titleValue: string;
    postHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    postValue: string;
}>;

const postInput: React.FC<propsType> = (props) => (
    <div className={style.box}>
        <textarea
            maxLength={300}
            className={style.titleInput}
            placeholder="Title"
            spellCheck={true}
            onChange={props.titleHandler}
            required
        ></textarea>
        <textarea
            maxLength={10000}
            className={style.contentInput}
            placeholder="Content"
            spellCheck={true}
            onChange={props.postHandler}
            required
        ></textarea>
    </div>
);
export default postInput;
