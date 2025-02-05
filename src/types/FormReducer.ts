import Transaction from "./Transaction";

export type State = Transaction & {
    today:string
};

export type FormReducerAction = {
    type: string, 
    payload: {
        date?: Date, 
        category?: string,
        value?: string
    }
};