import Transaction from "../../../types/Transaction";
import './transactionsListItem.scss';

export default function TransactionsListItem({transaction}:{transaction:Transaction}){
    return(
        <li className="transactions-list-item">
            <div className="tr-col0">
                <img src={transaction.image} alt={transaction.category}/>
            </div>
            <p className="tr-col1">
                {transaction.description}
            </p> 
            <p className="tr-col2">
                {transaction.category}
            </p>
            <p className="tr-col3">
                {transaction.date}
            </p>
            <p className="tr-col4">
                {`$${transaction.amount}`}
            </p>
        </li>
    );
}