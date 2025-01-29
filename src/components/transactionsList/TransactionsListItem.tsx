import Transaction from "../../types/Transaction";
export default function TransactionsListItem({transaction}:{transaction:Transaction}){
    return(
        <>Transaction id: {transaction.id}</>
    );
}