import { useState, useEffect } from "react";
import { useQuery } from "react-query";
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

    const { isLoading, error, data } = useQuery(["notices", group], () =>
        fetchData(group)
    );

    useEffect(() => {
        if (isLoading) setButton(buttonStates.loading);
        if (error) setButton(buttonStates.error);

        if (data && data.status === 200) {
            contents.push(...data.data);

            if (data.data.length === docPerGroup) {
                setButton(buttonStates.success);
            } else if (data.data.length < docPerGroup) {
                setButton(buttonStates.end);
            }
        }
    }, [isLoading, error, data]);

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
