import React, { useCallback, useReducer } from "react";
import Post from "../components/post/post";
import Card from "../components/card/card";
import FetchButton from "../components/fetch_button/fetch_button";
import reducer from "../frontend_utils/reducer";
import { noticeType, actionType } from "../types";

const index: React.FC = () => {
    const [notices, dispatch] = useReducer<
        (state: noticeType[], action: actionType) => noticeType[]
    >(reducer, []);

    const deleteHandler = useCallback((id: string) => {
        dispatch({ type: "DELETE", id: id });
    }, []);

    const updateHandler = useCallback((notice: noticeType) => {
        dispatch({ type: "UPDATE", notice: notice });
    }, []);

    return (
        <>
            <Post dispatch={dispatch}></Post>

            {notices.map((doc: noticeType) => (
                <Card
                    key={doc._id}
                    id={doc._id}
                    deleteHandler={deleteHandler}
                    updateHandler={updateHandler}
                    title={doc.title}
                    content={doc.content}
                ></Card>
            ))}

            <FetchButton notices={notices} dispatch={dispatch}></FetchButton>
        </>
    );
};

export default React.memo(index);
