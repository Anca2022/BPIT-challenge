import Transaction from "./Transaction"; 
import { T_ACTION } from "../hooks/transactionReducer";

export type TransactionPageState ={
    data: Transaction[],
    transactions: Transaction[],
    categories: string[],
    category: string,  
    sortWord: string, 
    searchWord: string, 
}

export type TransactionAction = 
{
    type: typeof T_ACTION.FETCHED_DATA, //"fetchedData"
    payload: {
        data: Transaction[], 
        categories: string[], 
    }
} | {
    type: typeof T_ACTION.ADD_TRANSACTION, 
    payload: {
        data: Transaction[], 
            category: string, 
            sortWord: string, 
            searchWord: string
        }
} | {
    type: typeof T_ACTION.SEARCH | typeof T_ACTION.FILTER | typeof T_ACTION.SORT,  
    payload: string
    }
