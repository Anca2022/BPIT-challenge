export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    image: string;
  }
  
  export interface ApiTransaction extends Omit<Transaction, "amount"> {
    amount: string;
    accountName: string;
    spentLocation: string;
    spentLocationImage: string;
  }
  