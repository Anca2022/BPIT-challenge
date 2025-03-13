import Transaction from "../types/Transaction";
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
        transactions: searchSortFilter(
          state.category,
          action.payload,
          state.sortWord
        ),
      };
    case "filter":
      return {
        ...state,
        category: action.payload,
        transactions: searchSortFilter(
          action.payload,
          state.searchWord,
          state.sortWord
        ),
      };
    case "sort":
      return {
        ...state,
        sortWord: action.payload,
        transactions: searchSortFilter(
          state.category,
          state.searchWord,
          action.payload
        ),
      };
    default:
      throw new Error("Invalid action type for transactionReducer");
  }

  function searchSortFilter(
    category: string,
    search: string,
    sort: string
  ): Transaction[] {
    let dataToBeOrdered: Transaction[] = [];
    if (category === "All Transactions") dataToBeOrdered = [...state.data];
    else
      dataToBeOrdered = state.data.filter((item) =>
        item.category.includes(category)
      );
    switch (sort) {
      case "Highest":
        dataToBeOrdered.sort((a, b) => b.amount - a.amount);
        break;
      case "Lowest":
        dataToBeOrdered.sort((a, b) => a.amount - b.amount);
        break;
      case "Latest":
      case "Oldest":
        dataToBeOrdered.sort((a, b) => {
          const date1 = new Date(a.date);
          const date2 = new Date(b.date);
          if (sort === "Latest") {
            return date2.getTime() - date1.getTime();
          } else return date1.getTime() - date2.getTime();
        });
    }
    const filteredData = dataToBeOrdered.filter((item) => {
      return item.description.toLowerCase().includes(search.toLowerCase());
    });
    return filteredData;
  }
}

export const T_ACTION = {
  FETCHED_DATA: "fetchedData",
  ADD_TRANSACTION: "addTransaction",
  SEARCH: "search",
  FILTER: "filter",
  SORT: "sort",
} as const;
