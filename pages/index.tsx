import { useReducer } from "react";
import Post from "../components/post/post";
import Card from "../components/card/card";
import FetchButton from "../components/fetch_button/fetch_button";
import reducer from "../frontend_utils/reducer";
import { noticeType, actionType } from "../types";

const Home: React.FC = () => {
    const [notices, dispatch] = useReducer<
        (state: noticeType[], action: actionType) => noticeType[]
    >(reducer, []);

    return (
        <>
            <Post dispatch={dispatch}></Post>

            {notices.map((doc: noticeType) => (
                <Card
                    key={doc._id}
                    id={doc._id}
                    deleteHandler={(id: string) => {
                        dispatch({ type: "DELETE", id: id });
                    }}
                >
                    <h2>{doc.title}</h2>
                    <p>{doc.content}</p>
                </Card>
            ))}

            <FetchButton notices={notices} dispatch={dispatch}></FetchButton>
        </>
    );
};

export default Home;
