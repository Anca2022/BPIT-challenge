import { useEffect, useState } from 'react';
import SearchAndFilter from '../../components/searchAndFilter/SearchAndFilter';
import TransactionsList from '../../components/transactionsList/TransactionsList';
import TransactionsTotal from '../../components/transactionsTotal/TransactionsTotal';
import Transaction from '../../types/Transaction';
import './transactions.scss';
export default function Transactions(){
    const [transactions, setTransactions]=useState< Transaction[] | null>(null); 
    useEffect(()=>{
        console.log("effect ran");
        fetch("src/data/transactions.json")
        .then(data => data.json())
        .then(data =>{
            console.log(data);
            setTransactions(data);
        })
       }, [])
    return (
        <section className='transactions-page'>
            <div className="transactions-page-header">
                <h1 className="title">Transactions</h1>
                <button className='add-button'>+ Add</button>
            </div>
            <div className="content-container">
                <SearchAndFilter/>
                {transactions? 
                    <TransactionsList transactions={transactions}/>
                    : <>No transactions available</>
                }
                    
                <TransactionsTotal/>
            </div>
        </section>
    )
}