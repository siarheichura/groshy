import { MoneyMoveItem } from './DayMoneyMove';

interface WalletI {
  id: string;
  name: string;
  currency: string;
  balance: number;
  // expenseCategories?: string[];
  // incomeCategories?: string[];
  // expenses?: MoneyMoveItem[];
  // income?: MoneyMoveItem[];
}

export class Wallet implements WalletI {
  id: string = '';
  name: string = '';
  currency: string = '';
  balance: number = 0;
  // expenseCategories?: string[] = [];
  // incomeCategories?: string[] = [];
  // expenses?: MoneyMoveItem[] = [];
  // income?: MoneyMoveItem[] = [];

  constructor(wallet: WalletI) {
    Object.assign(this, wallet);
  }
}
