import { Income } from './Income';
import { Expense } from './Expense';

interface WalletI {
  _id: string;
  name: string;
  currency: string;
  amount: number;
  expenseCategories: string[];
  incomeCategories: string[];
  expenses?: Expense[];
  income?: Income[];
}

export class Wallet implements WalletI {
  _id: string = '';
  name: string = '';
  currency: string = '';
  amount: number = 0;
  expenseCategories: string[] = [];
  incomeCategories: string[] = [];
  expenses?: Expense[] = [];
  income?: Income[] = [];

  constructor(init: WalletI) {
    Object.assign(this, init);
  }
}
