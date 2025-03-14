import SearchAndFilter from "../searchAndFilter/SearchAndFilter";
import TransactionsList from "../transactionsList/TransactionsList";
import TransactionsTotal from "../transactionsTotal/TransactionsTotal";
import { TransactionsSubcomponentProps } from "../../types/Props";
import { T_ACTION } from "../../hooks/transactionReducer";

export default function TransactionsContent({
  state,
  dispatch,
}: TransactionsSubcomponentProps) {
  const total =
    state.transactions?.reduce((total, item) => total + item.amount, 0) || 0;

  function search(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: T_ACTION.SEARCH, payload: e.target.value });
  }
  function filter(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    dispatch({ type: T_ACTION.FILTER, payload: target.innerText });
  }
  function sort(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    dispatch({ type: T_ACTION.SORT, payload: target.innerText });
  }
  return (
    <div className="content-container">
      <SearchAndFilter
        search={search}
        filter={filter}
        sort={sort}
        categories={state.categories}
        category={state.category}
        sortWord={state.sortWord}
        searchWord={state.searchWord}
      />
      {state.transactions && state.transactions.length > 0 ? (
        <TransactionsList transactions={state.transactions} />
      ) : (
        <p className="no-data">No transactions available</p>
      )}
      <TransactionsTotal category={state.category} total={total} />
    </div>
  );
}
