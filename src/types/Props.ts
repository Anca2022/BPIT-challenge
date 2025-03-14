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

export interface ModalHeaderProps {
  onClick: () => void;
}
