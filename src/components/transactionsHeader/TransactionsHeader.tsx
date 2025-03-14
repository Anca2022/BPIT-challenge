import { useState } from "react";
import CtaButton from "../ctaButton/CtaButton";
import Modal from "../modal/Modal";
import Transaction from "../../types/Transaction";
import { TransactionsSubcomponentProps } from "../../types/Props";
export default function TransactionsHeader({
  state,
  dispatch,
}: TransactionsSubcomponentProps) {
  const [modal, setModal] = useState(false);
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
    <div className="transactions-page-header">
      <h1 className="title">Transactions</h1>
      <CtaButton handleClick={openModal}>+ Add</CtaButton>
      {modal && (
        <Modal
          setModal={setModal}
          categories={state.categories}
          addTransaction={addTransaction}
          id={state.data ? (state.data.length + 1).toString() : "1"}
        />
      )}
    </div>
  );
}
