import { useRef, useState, useEffect } from "react";
import CtaBtn from "../ctaBtn/CtaBtn";
import CaretDown from "../../assets/icon-caret-down.svg?react";
import Transaction from "../../types/Transaction";
import dateOptions from "../../data/dateOptions";
import "./modal.scss"; 
import "../inputField.scss";

interface Props{
    setModal: (value: React.SetStateAction<boolean>) => void;
    addTransaction: (t:Transaction)=>void;
    categories: string[] | null;
    id:string
}
export default function Modal({setModal, addTransaction, categories, id}:Props){
    const categoryRef = useRef<HTMLDivElement | null>(null)
    const [category, setCategory] = useState<string>('Groceries');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string>(''); 
    const [date, setDate] = useState<string>(); 
    const [today, setToday] = useState<string>('');

    useEffect(()=>{
        const dateToday = new Date(Date.now());
        const dateForInput = dateToday.toISOString().split("T")[0]; 
        const dateForTransaction = dateToday.toLocaleDateString("en-GB", dateOptions);
        setToday(dateForInput);
        setDate(dateForTransaction);
    }, [])

    function toggleDropdown(){
        categoryRef.current?.classList.toggle("display-dropdown"); 
    }
    function handleSelect(e:React.MouseEvent<HTMLUListElement, MouseEvent> 
        | React.KeyboardEvent<HTMLLIElement>){
        const target = e.target as HTMLElement; 
        setCategory(target.innerText);
        toggleDropdown();
    }
    function handleDate(inputDate:string){
        const date = new Date(inputDate);
        const dateForInput = date.toISOString().split("T")[0]; 
        const dateForTransaction = date.toLocaleDateString("en-GB", dateOptions);
        setDate(dateForTransaction);
        setToday(dateForInput);
    }
    function submitForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const image = category.toLowerCase().replace(" ", "-");
        const transaction:Transaction = {
            id: id,
            date: date!,
            description: description,
            amount: Number(amount!),
            category: category,
            image: `assets/${image}.jpg`
        }
        addTransaction(transaction);
        setModal(false);
    }
    return(
        <div className="container">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Add New Transaction</h2>
                    <button className="close-modal-btn" 
                    onClick={()=>setModal(false)}
                    >
                        ✖
                    </button>
                </div>
                <p className="modal-text">Choose a category and set the amount for your transaction.</p>
                <form onSubmit={submitForm}>
                    <label>Transaction Category</label>
                    <div className="sort">
                        <div className="input-field"
                        tabIndex={0}
                        onClick={toggleDropdown}
                        onKeyUp={(e)=>{ if(e.key==="Enter") toggleDropdown()}}
                        >
                            <span>{category}</span>
                            <CaretDown/>
                        </div>
                        <div className="select-dropdown" ref={categoryRef}>
                            <ul
                            onClick={(e)=>handleSelect(e)}
                            >
                                {categories &&
                                categories.map(item => {
                                    return <li tabIndex={0} key={item}
                                    onKeyUp={(e)=>{ if(e.key==="Enter") handleSelect(e)}}
                                    >
                                        {item}
                                    </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <label htmlFor="description">Description</label>
                    <div className="input-field">
                        <input id="description" 
                        type="text" 
                        placeholder="Ex: going to the movies"
                        required
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                                      
                    <label htmlFor="amount">Amount Spend</label>
                    <div className="input-field">
                        <input id="amount" 
                        type="number" step="0.01" min="0" 
                        placeholder="Enter a number" 
                        required
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        />
                    </div>
                    
                    <label htmlFor="date">Date</label>
                    <div className="input-field">
                        <input id="date" 
                        type="date" 
                        value={today}
                        required
                        onChange={(e)=>handleDate(e.target.value)}
                        />
                    </div>
                    
                    <CtaBtn>Add Transaction</CtaBtn>
                </form>
            </div>
        </div>
    )
}