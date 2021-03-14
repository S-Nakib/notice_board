export type buttonStateType = Readonly<{
    state: boolean;
    message: string;
}>;

export type buttonStatesType = Readonly<
    Pick<
        {
            [name: string]: buttonStateType;
        },
        "loading" | "error" | "success" | "end"
    >
>;

//Type of the contents of each notice
export type contentType = {
    _id: string;
    title: string;
    content: string;
};
