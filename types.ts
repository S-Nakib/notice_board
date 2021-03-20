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
export type noticeType = {
    _id: string;
    title: string;
    content: string;
};

//Action on the notice reducer.
export type actionType =
    | {
          type: "CREATE";
          notice: noticeType;
      }
    | {
          type: "READ";
          notices: noticeType[];
      }
    | {
          type: "DELETE";
          id: string;
      };
