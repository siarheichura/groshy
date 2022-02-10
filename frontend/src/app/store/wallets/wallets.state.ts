import { Expense, InitWalletExpenses } from 'src/app/shared/interfaces/Expense';
import { Income, InitWalletIncome } from './../../shared/interfaces/Income';
import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  walletCurrency: string;
  loading: boolean;
  initialExpenses: InitWalletExpenses;
  initialIncome: InitWalletIncome;
  expenses: Expense[];
  income: Income[];
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: {
    _id: '',
    name: '',
    amount: 0,
    currency: '',
    expenses: [],
    income: [],
    userId: '',
  },
  walletCurrency: '',
  loading: false,
  initialExpenses: {
    today: [],
    yesterday: [],
  },
  initialIncome: {
    today: [],
    yesterday: [],
  },
  expenses: [],
  income: [],
};
