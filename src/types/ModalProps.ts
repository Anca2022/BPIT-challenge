import Transaction from "./Transaction";

export default interface ModalProps {
  setModal: (value: React.SetStateAction<boolean>) => void;
  addTransaction: (t: Transaction) => void;
  categories: string[] | null;
  id: string;
}