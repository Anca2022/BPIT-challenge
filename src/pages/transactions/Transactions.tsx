import { useEffect, useReducer, useState } from 'react';
import { INITIAL_STATE, transactionReducer, T_ACTION } from '../../hooks/transactionReducer';
import SearchAndFilter from '../../components/searchAndFilter/SearchAndFilter';
import TransactionsList from '../../components/transactionsList/TransactionsList';
import TransactionsTotal from '../../components/transactionsTotal/TransactionsTotal';
import Modal from '../../components/modal/Modal';
import CtaBtn from '../../components/ctaBtn/CtaBtn';
import Transaction from '../../types/Transaction';
import './transactions.scss';

export default function Transactions(){
    const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE)
    const [modal, setModal] = useState(false);
    
    useEffect(()=>{
        fetch("/data/transactions.json")
        .then(response => response.json())
        .then((response : Transaction[] | null ) =>{
            if(response){
                const allCategories = new Set(response.map((item : Transaction) => item.category)); 
                const allCategoriesString = [...allCategories]; 
                dispatch({
                    type: "fetchedData", 
                    payload: {
                        data: response, 
                        categories: allCategoriesString
                    }
                })
            }
        })
        .catch(error=> console.log(error))
       }, [])
    
    let total = 0; 
    if (state.transactions) total = state.transactions.reduce(function (total, item){
        return total + item.amount}, 0);
    
    function search(e : React.ChangeEvent<HTMLInputElement>){
        dispatch({type:T_ACTION.SEARCH, payload: e.target.value})
    }
    function filter(e:React.MouseEvent<HTMLUListElement, MouseEvent>){
        const target = e.target as HTMLElement;
        dispatch({type:T_ACTION.FILTER, payload: target.innerText})
    }
    function sort(e:React.MouseEvent<HTMLUListElement, MouseEvent>){
        const target = e.target as HTMLElement;
        dispatch({type:T_ACTION.SORT, payload: target.innerText})
    }
    function openModal(){
        setModal(true); 
    }
    function addTransaction(t:Transaction){
        let newData :Transaction[] | null= null; 
        if (state.data){
            newData=[...state.data]; 
            newData.unshift(t);
        } else {newData=[t]}
        dispatch({
            type:"addTransaction", 
            payload: {
                data: newData, 
                category: "All Transactions", 
                sortWord: "Latest", 
                searchWord: ""
            }
        })
    }
    return (
        <section className='transactions-page'>
            <div className="transactions-page-header">
                <h1 className="title">Transactions</h1>
                <CtaBtn handleClick={openModal}>+ Add</CtaBtn>
                {modal && 
                    <Modal 
                    setModal={setModal} 
                    categories={state.categories} 
                    addTransaction={addTransaction}
                    id={state.data? (state.data.length + 1).toString(): "1"}
                    />
                }
            </div>
            <div className="content-container">
                <SearchAndFilter search={search} filter={filter} sort={sort} 
                categories={state.categories} category={state.category} sortWord={state.sortWord} searchWord={state.searchWord}
                />
                {state.transactions && state.transactions.length>0 
                    ? <TransactionsList transactions={state.transactions}/>
                    : <p className='no-data'>No transactions available</p>
                }
                <TransactionsTotal category={state.category} total={total}/>
            </div>
        </section>
    )
}