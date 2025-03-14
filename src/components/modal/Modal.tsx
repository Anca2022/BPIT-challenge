import { useReducer } from "react";
import {
  formReducer,
  createInitialForm,
  ACTION,
} from "../../hooks/formReducer";
import ModalHeader from "../modalHeader/ModalHeader";
import ModalDropdown from "../modalDropdown/ModalDropdown";
import ModalInputField from "../modalInputField/ModalInputField";
import CtaBtn from "../ctaButton/CtaButton";
import ModalProps from "../../types/ModalProps";
import "./modal.scss";
import "../inputField.scss";

export default function Modal({
  closeModal,
  addTransaction,
  categories,
  id,
}: ModalProps) {
  const [state, dispatch] = useReducer(formReducer, id, createInitialForm);

  function handleSelect(
    e:
      | React.MouseEvent<HTMLUListElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>
  ) {
    const target = e.target as HTMLElement;
    dispatch({ type: ACTION.ADD_CATEGORY, payload: target.innerText });
  }
  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ACTION.ADD_DESCRIPTION, payload: e.target.value });
  }
  function handleAmount(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ACTION.ADD_AMOUNT, payload: e.target.value });
  }
  function handleDate(inputDate: string) {
    const date = new Date(inputDate);
    dispatch({ type: ACTION.SET_DATE, payload: date });
  }
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { today, ...transaction } = state;
    void today;
    addTransaction(transaction);
    closeModal();
  }
  return (
    <div className="container">
      <div className="modal-container">
        <ModalHeader onClick={() => closeModal()} />
        <p className="modal-text">
          Choose a category and set the amount for your transaction.
        </p>
        <form onSubmit={submitForm}>
          <ModalDropdown
            addSelection={handleSelect}
            categories={categories}
            category={state.category}
          />
          <ModalInputField
            labelDescription="description"
            type="text"
            placeholder="Ex: going to the movies"
            value={state.description}
            onChange={(e) => handleDescription(e)}
          />
          <ModalInputField
            labelDescription="amount"
            type="number"
            placeholder="Enter a number"
            onChange={(e) => handleAmount(e)}
          />
          <ModalInputField
            labelDescription="date"
            type="date"
            value={state.today}
            onChange={(e) => handleDate(e.target.value)}
          />
          <CtaBtn>Add Transaction</CtaBtn>
        </form>
      </div>
    </div>
  );
}
