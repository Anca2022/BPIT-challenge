import Transaction from "./Transaction";

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
