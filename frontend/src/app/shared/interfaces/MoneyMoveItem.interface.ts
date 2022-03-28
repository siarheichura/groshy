export interface MoneyMoveItem {
  id: string;
  category: string;
  amount: number;
  date: Date;
  comment?: string;
  checkBase64?: string;
}
