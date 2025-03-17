import Transaction from "./Transaction";
import { TransactionPageState } from "./TransactionReducer";
import { TransactionAction } from "./TransactionReducer";

export interface SearchFilterParams {
  data: Transaction[];
  category: string;
  search: string;
  sort: string;
}

export interface CtaButtonProps {
  handleClick?: () => void;
}

export interface TransactionsTotalProps {
  category: string;
  total: number;
}

export interface TransactionsSubcomponentProps {
  state: TransactionPageState;
  dispatch: React.Dispatch<TransactionAction>;
}

export interface ModalProps {
  closeModal: () => void;
  addTransaction: (t: Transaction) => void;
  categories: string[] | null;
  id: string;
}
export interface ModalHeaderProps {
  onClick: () => void;
}

export interface InputFieldProps {
  labelDescription: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalDropdownProps {
  addSelection: (
    e:
      | React.MouseEvent<HTMLUListElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>
  ) => void;
  categories: string[] | null;
  category: string;
}