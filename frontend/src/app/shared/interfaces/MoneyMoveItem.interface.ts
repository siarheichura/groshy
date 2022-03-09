export interface MoneyMoveItem {
  _id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;
}
