import Transaction from "./Transaction";
import { ACTION } from "../hooks/formReducer";

export type FormState = Transaction & {
    today:string
};

export type FormReducerAction = {
    type: typeof ACTION.ADD_CATEGORY | typeof ACTION.ADD_AMOUNT | typeof ACTION.ADD_DESCRIPTION, 
    payload: string
} | {
    type: typeof ACTION.SET_DATE, 
    payload: Date
}