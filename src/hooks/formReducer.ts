import { FormState, FormReducerAction } from "../types/FormReducer";
import {
  formatDateForInput,
  formatDateForTransaction,
} from "../utils/formatDate";
import { createImagePath } from "../utils/imageUtils";

export function createInitialForm(id: string): FormState {
  const dateToday = new Date(Date.now());
  const category = "Groceries";
  return {
    id: id,
    category: category,
    description: "",
    amount: 0,
    date: formatDateForTransaction(dateToday),
    today: formatDateForInput(dateToday),
    image: createImagePath(category),
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
        today: formatDateForInput(action.payload),
        date: formatDateForTransaction(action.payload),
      };
    case "addCategory":
      return {
        ...state,
        category: action.payload,
        image: createImagePath(action.payload),
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
