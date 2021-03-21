import { noticeType, actionType } from "../types";

const reducer = (state: noticeType[], action: actionType): noticeType[] => {
    switch (action.type) {
        case "CREATE":
            return [action.notice, ...state];

        case "READ":
            const newState = [...state];
            newState.push(...action.notices);
            return newState;

        case "UPDATE":
            return state.map((notice) =>
                notice._id === action.notice._id ? action.notice : notice
            );

        case "DELETE":
            return state.filter((value) => value._id !== action.id);

        default:
            throw new Error();
    }
};

export default reducer;
