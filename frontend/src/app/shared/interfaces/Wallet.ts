import { Income } from './Income';
import { Expense } from './Expense';

export interface WalletI {
  _id: string;
  name: string;
  currency: string;
  amount: number;
  expenses?: Expense[];
  income?: Income[];
}

export class Wallet implements WalletI {
  _id: string = '';
  name: string = '';
  currency: string = '';
  amount: number = 0;
  expenses?: Expense[] = [];
  income?: Income[] = [];

  constructor(init: WalletI) {
    Object.assign(this, init);
  }
}
