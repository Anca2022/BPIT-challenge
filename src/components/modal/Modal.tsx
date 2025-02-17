import { useRef, useReducer } from "react";
import { formReducer, createInitialForm, ACTION } from "../../hooks/formReducer";
import CtaBtn from "../ctaBtn/CtaBtn";
import CaretDown from "../../assets/icon-caret-down.svg?react";
import ModalProps from "../../types/ModalProps";
import "./modal.scss"; 
import "../inputField.scss";

export default function Modal({setModal, addTransaction, categories, id}:ModalProps){
    const categoryRef = useRef<HTMLDivElement | null>(null)
    const [state, dispatch] = useReducer(formReducer, id, createInitialForm ); 

    function toggleDropdown(){
        categoryRef.current?.classList.toggle("display-dropdown"); 
    }
    function handleSelect(e:React.MouseEvent<HTMLUListElement, MouseEvent> | React.KeyboardEvent<HTMLLIElement>){
        const target = e.target as HTMLElement; 
        dispatch({type: ACTION.ADD_CATEGORY, payload: target.innerText});
        toggleDropdown();
    }
    function handleDescription(e : React.ChangeEvent<HTMLInputElement>){
        dispatch({type: ACTION.ADD_DESCRIPTION, payload: e.target.value})
    }
    function handleAmount(e : React.ChangeEvent<HTMLInputElement>){
        dispatch({type: ACTION.ADD_AMOUNT, payload: e.target.value})
    }
    function handleDate(inputDate:string){
        const date = new Date(inputDate);
        dispatch({type:ACTION.SET_DATE, payload:date})
    }
    function submitForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const {today, ...transaction} = state;  
        void today; 
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
                            <span>{state.category}</span>
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
                        value={state.description}
                        onChange={(e)=>handleDescription(e)}
                        />
                    </div>
                                      
                    <label htmlFor="amount">Amount Spend</label>
                    <div className="input-field">
                        <input id="amount" 
                        type="number" step="0.01" min="0" 
                        placeholder="Enter a number" 
                        required
                        onChange={(e)=>handleAmount(e)}
                        />
                    </div>
                    
                    <label htmlFor="date">Date</label>
                    <div className="input-field">
                        <input id="date" 
                        type="date" 
                        value={state.today}
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