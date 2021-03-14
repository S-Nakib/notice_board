import { useState, useEffect } from "react";
import { useAsync } from "react-async-hook";
import fetchData from "../frontend_utils/fetchData";
import Card from "../components/card/card";
import PostInput from "../components/post_input/post_input";
import Button from "../components/button/button";
import { buttonStateType, contentType } from "../types";
import { buttonStates } from "../globals";

const docPerGroup = 3;
let contents: contentType[] = [];

const Home: React.FC = () => {
    const [group, setGroup] = useState<number>(1);
    const [button, setButton] = useState<buttonStateType>(buttonStates.loading);

    const asyncData = useAsync(fetchData, [group]);

    useEffect(() => {
        if (asyncData.loading) setButton(buttonStates.loading);
        if (asyncData.error) setButton(buttonStates.error);

        if (asyncData.result && asyncData.result.status === 200) {
            contents.push(...asyncData.result.data);

            if (asyncData.result.data.length === docPerGroup) {
                setButton(buttonStates.success);
            } else if (asyncData.result.data.length < docPerGroup) {
                setButton(buttonStates.end);
            }
        }
    }, [asyncData.loading, asyncData.error, asyncData.result]);

    return (
        <>
            <PostInput></PostInput>
            {contents.map((doc: contentType) => (
                <Card key={doc._id}>
                    <h2>{doc.title}</h2>
                    <p>{doc.content}</p>
                </Card>
            ))}

            <Button
                state={button.state}
                handler={() => {
                    setGroup((prevGroup: number) => prevGroup + 1);
                }}
            >
                {button.message}
            </Button>
        </>
    );
};

export default Home;
