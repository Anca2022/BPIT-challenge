import { FormState, FormReducerAction } from "../types/FormReducer";
import dateOptions from "../data/dateOptions";

export function createInitialForm(id:string):FormState{
    const dateToday = new Date(Date.now());
    return {
        id: id, 
        category:'Groceries', 
        description: '', 
        amount: 0, 
        date: dateToday.toLocaleDateString("en-GB", dateOptions), //date in string format for transaction obj
        today: dateToday.toISOString().split("T")[0],  //date in string format for input field
        image: 'assets/groceries.jpg'
    };
}

export function formReducer(state:FormState, action:FormReducerAction):FormState{
    switch(action.type){
        case "setDate": 
            return{...state, 
                today: action.payload.date
                    ?.toISOString().split("T")[0] 
                    ?? state.today, 
                date: action.payload.date
                    ?.toLocaleDateString("en-GB", dateOptions) 
                    ?? state.date
            }; 
        case "addCategory": 
            return{...state, 
                category: action.payload.category
                    ? action.payload.category 
                    : "Groceries", 
                image: `assets/${action.payload.category?.toLowerCase().replace(" ", "-")}.jpg`
            }; 
        case "addDescription": 
            return {...state, 
                description: action.payload.value
                    ? action.payload.value 
                    : ""
            }; 
        case "addAmount": 
            return {...state, 
                amount: action.payload.value 
                    ? Number(action.payload.value)
                    : 0
            }; 
        default: 
            throw new Error('Invalid action for formReducer');
    }
} 

export const ACTION = {
    SET_DATE: 'setDate', 
    ADD_CATEGORY: 'addCategory', 
    ADD_DESCRIPTION: 'addDescription', 
    ADD_AMOUNT: 'addAmount'
}