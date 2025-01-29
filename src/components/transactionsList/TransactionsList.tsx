import TransactionsListItem from "./TransactionsListItem";
import Transaction from "../../types/Transaction";
export default function TransactionsList({transactions} : {transactions: Transaction[]}){
    return(
        <div className='transactions-container'>
            <div className='transaction-list-header'>
            </div>
            <ul className='transactions-list'>
                {
                transactions.map((transaction:Transaction): JSX.Element =>{
                    return <li key={transaction.id}>
                        <TransactionsListItem transaction={transaction}/>
                    </li>
                })
                }
            </ul>
        </div>
    );
}