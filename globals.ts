import { buttonStatesType } from "./types";

export const buttonStates: buttonStatesType = {
    loading: {
        state: false,
        message: "Loading..."
    },
    error: {
        state: true,
        message: "An error occured. Try again."
    },
    success: {
        state: true,
        message: "Click for more"
    },
    end: {
        state: false,
        message: "No more notices"
    }
};

export const cookieMaxAge = 36000;
export const noticesPerGroup = 3;
