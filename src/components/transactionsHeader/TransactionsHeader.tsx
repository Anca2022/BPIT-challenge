import { useState } from "react";
import addTransactionUtil from "../../utils/addTransaction";
import CtaButton from "../ctaButton/CtaButton";
import Modal from "../modal/Modal";
import { TransactionsSubcomponentProps } from "../../types/Props";

export default function TransactionsHeader({
  state,
  dispatch,
}: TransactionsSubcomponentProps) {
  const [modal, setModal] = useState(false);
  const addTransaction = addTransactionUtil(state, dispatch);

  return (
    <div className="transactions-page-header">
      <h1 className="title">Transactions</h1>
      <CtaButton handleClick={() => setModal(true)}>+ Add</CtaButton>
      {modal && (
        <Modal
          id={state.data ? (state.data.length + 1).toString() : "1"}
          categories={state.categories}
          closeModal={() => setModal(false)}
          addTransaction={addTransaction}
        />
      )}
    </div>
  );
}
