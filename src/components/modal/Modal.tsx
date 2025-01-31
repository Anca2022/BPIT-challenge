import { useRef, useState } from "react";
import CtaBtn from "../ctaBtn/CtaBtn";
import CaretDown from "../../assets/icon-caret-down.svg?react";
import Transaction from "../../types/Transaction";
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

    function toggleDropdown(){
        categoryRef.current?.classList.toggle("display-dropdown"); 
    }
    function handleSelect(e:React.MouseEvent<HTMLUListElement, MouseEvent>){
        const target = e.target as HTMLElement; 
        setCategory(target.innerText);
        toggleDropdown();
    }
    function handleDate(inputDate:string){
        const date = new Date(inputDate);
        const options:Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
        const formatted = date.toLocaleDateString("en-GB", options);
        setDate(formatted);
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
        console.log(transaction);
        addTransaction(transaction);
        setModal(false);
    }
    return(
        <div className="container">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Add New Transaction</h2>
                    <button className="close-modal-btn" onClick={()=>setModal(false)}>✖</button>
                </div>
                <p className="modal-text">Choose a category and set the amount for your transaction.</p>
                <form onSubmit={submitForm}>
                    <label>Transaction Category</label>
                    <div className="sort">
                        <div className="input-field"
                        tabIndex={0}
                        onClick={toggleDropdown}
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
                                    return <li key={item}>{item}</li>
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