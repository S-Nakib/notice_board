import style from "./post_input.module.scss";

const postInput: React.FC = () => (
    <div className={style.box}>
        <textarea
            maxLength={300}
            className={style.titleInput}
            placeholder="Title"
            spellCheck={true}
            required
        ></textarea>
        <textarea
            maxLength={10000}
            className={style.contentInput}
            placeholder="Content"
            spellCheck={true}
            required
        ></textarea>
    </div>
);
export default postInput;
