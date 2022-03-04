export interface MoneyMoveCategory {
  _id: string;
  name: string;
  type: string;
}

export interface MoneyMoveItem {
  _id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;
}
