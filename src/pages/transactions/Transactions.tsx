import { useEffect, useReducer, useState } from "react";
import {
  INITIAL_STATE,
  transactionReducer,
  T_ACTION,
} from "../../hooks/transactionReducer";
import SearchAndFilter from "../../components/searchAndFilter/SearchAndFilter";
import TransactionsList from "../../components/transactionsList/TransactionsList";
import TransactionsTotal from "../../components/transactionsTotal/TransactionsTotal";
import Modal from "../../components/modal/Modal";
import CtaBtn from "../../components/ctaButton/CtaButton";
import { Transaction, ApiTransaction } from "../../types/Transaction";
import "./transactions.scss";

export default function Transactions() {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://6784cce91ec630ca33a5b87f.mockapi.io/api/v1/data")
      .then((response) => response.json())
      .then((response: ApiTransaction[] | null) => {
        if (response) {
          const allCategories = new Set(
            response.map((item: ApiTransaction) => item.category)
          );
          const data = response.map((item): Transaction => {
            return {
              id: item.id,
              date: item.date,
              description: item.description,
              amount: Number(item.amount),
              category: item.category,
              image: item.spentLocationImage,
            };
          });
          dispatch({
            type: T_ACTION.FETCHED_DATA,
            payload: {
              data: data,
              categories: [...allCategories],
            },
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

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
  function openModal() {
    setModal(true);
  }
  function addTransaction(t: Transaction) {
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
  return (
    <section className="transactions-page">
      <div className="transactions-page-header">
        <h1 className="title">Transactions</h1>
        <CtaBtn handleClick={openModal}>+ Add</CtaBtn>
        {modal && (
          <Modal
            setModal={setModal}
            categories={state.categories}
            addTransaction={addTransaction}
            id={state.data ? (state.data.length + 1).toString() : "1"}
          />
        )}
      </div>
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
    </section>
  );
}
