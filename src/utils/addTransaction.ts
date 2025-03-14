import { TransactionPageState, TransactionAction } from "../types/TransactionReducer";
import Transaction from "../types/Transaction";

export default function addTransactionUtil( state: TransactionPageState, dispatch:React.Dispatch<TransactionAction>) {
  function addTransaction(t: Transaction){
    let newData: Transaction[] | null = null;
    if (state.data) {
      newData = [...state.data];
      newData.unshift(t);
    } else {
      newData = [t];
    }
    dispatch({
      type: "addTransaction",
      payload: {
        data: newData,
        category: "All Transactions",
        sortWord: "Latest",
        searchWord: "",
      },
    });
  }
  return addTransaction; 
}