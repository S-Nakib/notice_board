import { useState, useEffect, useContext } from "react";
import { LoginContext } from "./_app";
import { useQuery } from "react-query";
import fetchData from "../frontend_utils/fetchData";
import createPost from "../frontend_utils/create_post";
import Card from "../components/card/card";
import PostInput from "../components/post_input/post_input";
import AuthInput from "../components/auth_input/auth_input";
import Button from "../components/button/button";
import { buttonStateType, contentType } from "../types";
import { buttonStates } from "../globals";

const docPerGroup = 3;
let contents: contentType[] = [];

const Home: React.FC = () => {
    const { isLoggedIn } = useContext(LoginContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [group, setGroup] = useState<number>(1);
    const [noticesButton, setNoticesButton] = useState<buttonStateType>(
        buttonStates.loading
    );

    const {
        isLoading: noticesIsLoading,
        isError: noticesIsError,
        data: noticesData
    } = useQuery(["notices", group], () => fetchData(group));

    //This is needed to be checked again.
    useEffect(() => {
        if (noticesIsLoading) setNoticesButton(buttonStates.loading);
        if (noticesIsError) setNoticesButton(buttonStates.error);

        if (noticesData && noticesData.status === 200) {
            contents.push(...noticesData.data);

            if (noticesData.data.length === docPerGroup) {
                setNoticesButton(buttonStates.success);
            } else if (noticesData.data.length < docPerGroup) {
                setNoticesButton(buttonStates.end);
            }
        }
    }, [noticesIsLoading, noticesIsError, noticesData]);

    const {
        isLoading: postIsLoading,
        isError: postIsError,
        isFetching: postIsFetching,
        isSuccess: postIsSuccess,
        data: postData,
        refetch: postRefetch
    } = useQuery(["post"], () => createPost({ title, content }), {
        enabled: false
    });

    // useEffect(() => {
    //     if (!postIsFetching && postIsSuccess && postData) {
    //     }
    // }, [postIsFetching]);

    return (
        <>
            {isLoggedIn ? (
                <form
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        postRefetch();
                    }}
                >
                    <PostInput
                        titleHandler={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setTitle(e.target.value ?? "");
                        }}
                        titleValue={title}
                        postHandler={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setContent(e.target.value ?? "");
                        }}
                        postValue={content}
                    ></PostInput>
                    <AuthInput
                        type="submit"
                        value={postIsLoading ? "Loading..." : "Post"}
                        disabled={postIsLoading}
                        error={postIsError}
                        errorText="An error occured. Please try again."
                        success={postIsSuccess}
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

            {contents.map((doc: contentType) => (
                <Card key={doc._id}>
                    <h2>{doc.title}</h2>
                    <p>{doc.content}</p>
                </Card>
            ))}

            <Button
                state={noticesButton.state}
                handler={() => {
                    setGroup((prevGroup: number) => prevGroup + 1);
                }}
            >
                {noticesButton.message}
            </Button>
        </>
    );
};

export default Home;
