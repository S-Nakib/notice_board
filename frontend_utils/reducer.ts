import { noticeType, actionType } from "../types";

const reducer = (state: noticeType[], action: actionType): noticeType[] => {
    switch (action.type) {
        case "CREATE":
            return [action.notice, ...state];

        case "READ":
            const newState = [...state];
            newState.push(...action.notices);
            return newState;

        case "DELETE":
            return state.filter((value) => value._id !== action.id);

        default:
            throw new Error();
    }
};

export default reducer;
