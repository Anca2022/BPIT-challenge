import searchSortFilter from "../utils/searchSortFilter";
import {
  TransactionPageState,
  TransactionAction,
} from "../types/TransactionReducer";

export const INITIAL_STATE: TransactionPageState = {
  data: [],
  transactions: [],
  categories: [],
  category: "All Transactions",
  sortWord: "Latest",
  searchWord: "",
};
export function transactionReducer(
  state: TransactionPageState,
  action: TransactionAction
): TransactionPageState {
  switch (action.type) {
    case "fetchedData":
      return {
        ...state,
        data: action.payload.data,
        transactions: action.payload.data,
        categories: action.payload.categories,
      };
    case "addTransaction":
      return {
        ...state,
        data: action.payload.data,
        transactions: action.payload.data,
        category: action.payload.category,
        sortWord: action.payload.sortWord,
        searchWord: action.payload.searchWord,
      };
    case "search":
      return {
        ...state,
        searchWord: action.payload,
        transactions: searchSortFilter({
          data: state.data,
          category: state.category,
          search: action.payload,
          sort: state.sortWord,
        }),
      };
    case "filter":
      return {
        ...state,
        category: action.payload,
        transactions: searchSortFilter({
          data: state.data,
          category: action.payload,
          search: state.searchWord,
          sort: state.sortWord,
        }),
      };
    case "sort":
      return {
        ...state,
        sortWord: action.payload,
        transactions: searchSortFilter({
          data: state.data,
          category: state.category,
          search: state.searchWord,
          sort: action.payload,
        }),
      };
    default:
      throw new Error("Invalid action type for transactionReducer");
  }
}

export const T_ACTION = {
  FETCHED_DATA: "fetchedData",
  ADD_TRANSACTION: "addTransaction",
  SEARCH: "search",
  FILTER: "filter",
  SORT: "sort",
} as const;
