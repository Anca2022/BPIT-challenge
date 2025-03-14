import useTransactions from "../../hooks/useTransactions";
import TransactionsHeader from "../../components/transactionsHeader/TransactionsHeader";
import TransactionsContent from "../../components/transactionsContent/TransactionsContent";
import "./transactions.scss";

export default function Transactions() {
  const { state, dispatch } = useTransactions();

  return (
    <section className="transactions-page">
      <TransactionsHeader state={state} dispatch={dispatch} />
      <TransactionsContent state={state} dispatch={dispatch} />
    </section>
  );
}
