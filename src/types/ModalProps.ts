import Transaction from "./Transaction";

export default interface ModalProps {
  closeModal: () => void;
  addTransaction: (t: Transaction) => void;
  categories: string[] | null;
  id: string;
}