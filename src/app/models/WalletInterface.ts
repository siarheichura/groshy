import { Income } from './Income';
import { Expense } from './Expense';

export interface WalletInterface {
  id: string;
  name: string;
  currency: string;
  amount: number;
  year: number;
  expenses: Expense[];
  income: Income[];
}

export abstract class WalletClass implements WalletInterface {
  id: string = '';
  name: string = '';
  currency: string = '';
  amount: number = 0;
  expenses: Expense[] = [];
  income: Income[] = [];
  year: number = 2021;
  abstract increase(): void;
  constructor(init: WalletInterface) {
    Object.assign(this, init)
  }

}

export class Wallet2021 extends WalletClass{
  // get amountCurrency(): string {
  //   return `${this.amount} ${this.currency}`
  // }
  constructor(init: WalletInterface) {
    super(init);
  }
  increase(): void {
    this.amount = this.amount * 2;
  }
}

export class Wallet2022 extends WalletClass{
  // get amountCurrency(): string {
  //   return `${this.amount} ${this.currency}`
  // }
  constructor(init: WalletInterface) {
    super(init);
  }
  increase(): void {
    this.amount = this.amount * 2 * 100;
  }
}
