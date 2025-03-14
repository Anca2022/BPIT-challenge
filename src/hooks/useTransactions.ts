import { useEffect, useReducer } from "react";
import {
  INITIAL_STATE,
  transactionReducer,
  T_ACTION,
} from "./transactionReducer";
import Transaction from "../types/Transaction";

export default function useTransactions() {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  useEffect(() => {
    fetch("/data/transactions.json")
      .then((response) => response.json())
      .then((response: Transaction[] | null) => {
        if (response) {
          const allCategories = new Set(
            response.map((item: Transaction) => item.category)
          );
          dispatch({
            type: T_ACTION.FETCHED_DATA,
            payload: {
              data: response,
              categories: [...allCategories],
            },
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return { state, dispatch };
}
