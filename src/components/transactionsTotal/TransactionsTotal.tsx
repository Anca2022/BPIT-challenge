import "./transactionsTotal.scss";

export default function TransactionsTotal({category, total}:{category:string, total:number}){
    return(
        <div className='transactions-total'>
            <div className="total-text">
                <p>Spending Summary</p>
                <p className="transaction-category">
                    {category}
                </p>
            </div> 
            <p className="total-sum">
                ${total.toFixed(2)}
            </p>
        </div>
    );
}