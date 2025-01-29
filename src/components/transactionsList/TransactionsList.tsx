import TransactionsListItem from "./TransactionsListItem";
import Transaction from "../../types/Transaction";
import './transactionList.scss';

export default function TransactionsList({transactions} : {transactions: Transaction[]}){
    return(
        <div className='transactions-container'>
            <div className='transaction-list-header'>
                <p className="col1">Description</p>
                <p className="col2">Category</p>
                <p className="col3">Transaction Date</p>
                <p className="col4">Amount</p>
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