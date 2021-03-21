import React, { useState, useContext } from "react";
import { LoginContext } from "../../pages/_app";
import style from "./card.module.scss";
import { useMutation } from "react-query";
import deletePost from "../../frontend_utils/delete_post";
import PostInput from "../../components/post_input/post_input";
import updatePost from "../../frontend_utils/update_post";
import { noticeType } from "../../types";

type propsType = Readonly<{
    id: string;
    title: string;
    content: string;
    deleteHandler: (id: string) => void;
    updateHandler: (notice: noticeType) => void;
}>;

const Card: React.FC<propsType> = (props) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

    const { isLoggedIn } = useContext(LoginContext);

    const deleteMutation = useMutation(deletePost, {
        onSuccess: (data) => props.deleteHandler(data)
    });

    const updateMutation = useMutation(updatePost, {
        onSuccess: (notice) => {
            props.updateHandler(notice);
            setIsUpdating(false);
        }
    });

    return (
        <>
            {isUpdating ? (
                <div className={style.updateCard}>
                    <PostInput
                        titleValue={updatedTitle}
                        titleHandler={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setUpdatedTitle(e.target.value);
                        }}
                        contentValue={updatedContent}
                        contentHandler={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setUpdatedContent(e.target.value);
                        }}
                    ></PostInput>

                    <div className={style.buttons}>
                        <button
                            type="submit"
                            value="Cancel"
                            onClick={() => {
                                setIsUpdating(false);
                            }}
                            className={style.cancel}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            value="Update"
                            onClick={() => {
                                updateMutation.mutate({
                                    _id: props.id,
                                    title: updatedTitle,
                                    content: updatedContent
                                });
                            }}
                            className={style.update}
                        >
                            Update
                        </button>
                    </div>
                    <div className={style.messages}>
                        {updateMutation.isError
                            ? "An error occurred on Update. Please try again."
                            : null}
                    </div>
                </div>
            ) : (
                <div className={style.Card}>
                    <h2>{props.title}</h2>
                    <p>{props.content}</p>

                    {isLoggedIn ? (
                        <div>
                            <div className={style.buttons}>
                                <button
                                    className={style.delete}
                                    disabled={deleteMutation.isLoading}
                                    onClick={() => {
                                        deleteMutation.reset;
                                        deleteMutation.mutate(props.id);
                                    }}
                                >
                                    {deleteMutation.isLoading
                                        ? "Loading..."
                                        : "Delete"}
                                </button>
                                <button
                                    className={style.update}
                                    onClick={() => {
                                        setUpdatedTitle(props.title);
                                        setUpdatedContent(props.content);
                                        setIsUpdating(true);
                                    }}
                                >
                                    Update
                                </button>
                            </div>

                            <div className={style.messages}>
                                {deleteMutation.isError ? (
                                    <p>
                                        An error occurred on deletion. Please
                                        try again.
                                    </p>
                                ) : null}
                                {deleteMutation.isSuccess ? "Deleted!" : null}
                                {updateMutation.isSuccess ? "Updated" : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </>
    );
};

export default React.memo(Card);
