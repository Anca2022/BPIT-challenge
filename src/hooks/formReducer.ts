import { FormState, FormReducerAction } from "../types/FormReducer";
import dateOptions from "../data/dateOptions";

export function createInitialForm(id: string): FormState {
  const dateToday = new Date(Date.now());
  return {
    id: id,
    category: "Groceries",
    description: "",
    amount: 0,
    date: dateToday.toLocaleDateString("en-GB", dateOptions), //date in string format for transaction obj
    today: dateToday.toISOString().split("T")[0], //date in string format for input field
    image: "assets/groceries.jpg",
  };
}

export function formReducer(
  state: FormState,
  action: FormReducerAction
): FormState {
  switch (action.type) {
    case "setDate":
      return {
        ...state,
        today: action.payload.toISOString().split("T")[0],
        date: action.payload.toLocaleDateString("en-GB", dateOptions),
      };
    case "addCategory":
      return {
        ...state,
        category: action.payload,
        image: `assets/${action.payload.toLowerCase().replace(" ", "-")}.jpg`,
      };
    case "addDescription":
      return { ...state, description: action.payload };
    case "addAmount":
      return { ...state, amount: Number(action.payload) };
    default:
      throw new Error("Invalid action for formReducer");
  }
}

export const ACTION = {
  SET_DATE: "setDate",
  ADD_CATEGORY: "addCategory",
  ADD_DESCRIPTION: "addDescription",
  ADD_AMOUNT: "addAmount",
} as const;
