import { useState, useEffect, Dispatch } from "react";
import { useQuery } from "react-query";
import fetchData from "../../frontend_utils/fetchData";
import Button from "../../components/button/button";
import { buttonStateType, noticeType, actionType } from "../../types";
import { buttonStates, noticesPerGroup } from "../../globals";

type propsType = Readonly<{
    notices: noticeType[];
    dispatch: Dispatch<actionType>;
}>;

const fetchButton: React.FC<propsType> = (props) => {
    const [noticesButton, setNoticesButton] = useState<buttonStateType>(
        buttonStates.loading
    );

    const {
        isLoading: noticesIsLoading,
        isError: noticesIsError,
        data: noticesData,
        refetch: noticesRefetch
    } = useQuery(["notices"], () => fetchData(props.notices.length));

    //This is needed to be checked again.
    useEffect(() => {
        if (noticesIsLoading) setNoticesButton(buttonStates.loading);
        if (noticesIsError) setNoticesButton(buttonStates.error);

        if (noticesData && noticesData.status === 200) {
            props.dispatch({ type: "READ", notices: [...noticesData.data] });

            if (noticesData.data.length === noticesPerGroup) {
                setNoticesButton(buttonStates.success);
            } else if (noticesData.data.length < noticesPerGroup) {
                setNoticesButton(buttonStates.end);
            }
        }
    }, [noticesIsLoading, noticesIsError, noticesData]);

    return (
        <Button
            state={noticesButton.state}
            handler={() => {
                noticesRefetch();
            }}
        >
            {noticesButton.message}
        </Button>
    );
};

export default fetchButton;
