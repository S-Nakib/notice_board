import { useContext } from "react";
import { LoginContext } from "../../pages/_app";
import CardStyle from "./card.module.scss";
import { useMutation } from "react-query";
import deletePost from "../../frontend_utils/delete_post";

type propsType = Readonly<{
    id: string;
    children: React.ReactNode;
    deleteHandler: (id: string) => void;
}>;

const Card: React.FC<propsType> = (props) => {
    const { isLoggedIn } = useContext(LoginContext);

    const deleteMutation = useMutation(deletePost, {
        onSuccess: (data) => props.deleteHandler(data)
    });

    return (
        <>
            <div className={CardStyle.Card}>
                {props.children}
                {isLoggedIn ? (
                    <div>
                        <button
                            disabled={deleteMutation.isLoading}
                            onClick={() => {
                                deleteMutation.reset;
                                deleteMutation.mutate(props.id);
                            }}
                        >
                            {deleteMutation.isLoading ? "Loading..." : "Delete"}
                        </button>
                        {deleteMutation.isError
                            ? "An error occured on deletion. Please try again."
                            : null}
                        {deleteMutation.isSuccess ? "Deleted!" : null}
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Card;
