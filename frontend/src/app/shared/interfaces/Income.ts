export interface Income {
  _id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;
}

export interface InitWalletIncome {
  today: Income[];
  yesterday: Income[];
}
