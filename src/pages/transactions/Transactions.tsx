import { useEffect, useState } from 'react';
import SearchAndFilter from '../../components/searchAndFilter/SearchAndFilter';
import TransactionsList from '../../components/transactionsList/TransactionsList';
import TransactionsTotal from '../../components/transactionsTotal/TransactionsTotal';
import Modal from '../../components/modal/Modal';
import CtaBtn from '../../components/ctaBtn/CtaBtn';
import Transaction from '../../types/Transaction';
import './transactions.scss';

export default function Transactions(){
    const [data, setData] = useState<Transaction[] | null>(null);
    const [transactions, setTransactions]=useState<Transaction[] | null>(null);
    const [categories, setCategories] = useState <string[] | null>(null);
    const [category, setCategory] = useState("All Transactions");
    const [sortWord, setSortWord] = useState('Latest'); 
    const [searchWord, setSearchWord] = useState(''); 
    const [total, setTotal] = useState<number>(0); 
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        fetch("/data/transactions.json")
        .then(response => response.json())
        .then((response : Transaction[] | null ) =>{
            const allCategories = new Set(response?.map((item : Transaction) => item.category)); 
            const allCategoriesString = [...allCategories]; 
            setData(response);
            setTransactions(response);
            setCategories(allCategoriesString);
        })
        .catch(error=> console.log(error))
       }, [])
    
    useEffect(()=>{
        calcTotal();
        function calcTotal(){
            let sum = 0; 
            if (transactions){
                sum = transactions.reduce(function (total, item){return total + item.amount}, 0)
            }
            setTotal(sum); 
        }
    }, [transactions])
    
    function search(e : React.ChangeEvent<HTMLInputElement>){
        setSearchWord(e.target.value);
        searchSortFilter(category, e.target.value, sortWord);
    }
    function filter(e:React.MouseEvent<HTMLUListElement, MouseEvent>){
        const target = e.target as HTMLElement;
        setCategory(target.innerText); 
        searchSortFilter(target.innerText, searchWord, sortWord);
    }
    function sort(e:React.MouseEvent<HTMLUListElement, MouseEvent>){
        const target = e.target as HTMLElement;
        setSortWord(target.innerText); 
        searchSortFilter(category, searchWord, target.innerText);
    }
    function searchSortFilter(cat:string, search:string, sort:string){
        if(data){
            let preOrderedData: Transaction[]=[];  
            if(cat === "All Transactions") preOrderedData = [...data]; 
                else preOrderedData = data.filter(item => item.category.includes(cat));
            switch(sort){
                case "Highest": 
                    preOrderedData.sort((a, b) => b.amount - a.amount); 
                    break; 
                case "Lowest":
                    preOrderedData.sort((a, b) => a.amount - b.amount);
                    break;
                case "Latest":
                case "Oldest":
                    preOrderedData.sort((a,b)=>{
                        const date1 = new Date(a.date); 
                        const date2 = new Date(b.date);
                        if(sort === "Latest") {
                            return date2.getTime() - date1.getTime(); 
                        } else return date1.getTime() - date2.getTime();
                    });
            }
            const searchTransactions = preOrderedData.filter(item => {
                return item.description.toLowerCase().includes(search.toLowerCase())
            })
            setTransactions(searchTransactions); 
        }
    }
    function openModal(){
        setModal(true); 
    }
    function addTransaction(t:Transaction){
        let newData :Transaction[] | null= null; 
        if (data){
            newData=[...data]; 
            newData.unshift(t);
        } else {newData=[t]}
        setData(newData);
        setTransactions(newData);
    }

    return (
        <section className='transactions-page'>
            <div className="transactions-page-header">
                <h1 className="title">Transactions</h1>
                <CtaBtn handleClick={openModal}>+ Add</CtaBtn>
                {modal && 
                    <Modal 
                    setModal={setModal} 
                    categories={categories} 
                    addTransaction={addTransaction}
                    id={data? (data.length + 1).toString(): "1"}
                    />
                }
            </div>
            <div className="content-container">
                <SearchAndFilter search={search} filter={filter} sort={sort} 
                categories={categories} category={category} sortWord={sortWord}
                />
                {transactions && transactions.length>0 ? 
                    <TransactionsList transactions={transactions}/>
                    : <p className='no-data'>No transactions available</p>
                }
                <TransactionsTotal category={category} total={total}/>
            </div>
        </section>
    )
}