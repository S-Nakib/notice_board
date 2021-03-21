import React, { useState, useContext, useCallback, Dispatch } from "react";
import { useMutation } from "react-query";
import { LoginContext } from "../../pages/_app";
import PostInput from "../../components/post_input/post_input";
import AuthInput from "../../components/auth_input/auth_input";
import createPost from "../../frontend_utils/create_post";
import { actionType } from "../../types";

type propsType = Readonly<{
    dispatch: Dispatch<actionType>;
}>;

const post: React.FC<propsType> = (props) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { isLoggedIn } = useContext(LoginContext);

    const mutation = useMutation(createPost, {
        onSuccess: (data) => {
            props.dispatch({ type: "CREATE", notice: data });
            setTitle("");
            setContent("");
        }
    });

    const titleHandler = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTitle(e.target.value ?? "");
        },
        []
    );

    const contentHandler = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value ?? "");
        },
        []
    );

    return (
        <>
            {isLoggedIn ? (
                <form
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        mutation.mutate({ title: title, content: content });
                    }}
                >
                    <PostInput
                        titleHandler={titleHandler}
                        titleValue={title}
                        contentHandler={contentHandler}
                        contentValue={content}
                    ></PostInput>
                    <AuthInput
                        type="submit"
                        value={mutation.isLoading ? "Loading..." : "Post"}
                        disabled={mutation.isLoading}
                        error={mutation.isError}
                        errorText="An error occurred. Please try again."
                        success={mutation.isSuccess}
                        successText="Posted Successfully!"
                    ></AuthInput>
                </form>
            ) : (
                <>
                    <br />
                    <br />
                    <h1>Click on the button for older notices!</h1>
                    <br />
                    <br />
                </>
            )}
        </>
    );
};
export default React.memo(post);
