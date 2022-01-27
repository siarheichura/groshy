import { Income } from './Income';
import { Expense } from './Expense';

export interface Wallet {
  _id: string;
  name: string;
  currency: string;
  amount: number;
  expenses: Expense[];
  income: Income[];
}
