import { Expense } from 'src/app/shared/interfaces/Expense';
import { Income } from './../../shared/interfaces/Income';
import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  walletCurrency: string;
  loading: boolean;
  expensesByDay: Expense[];
  incomeByDay: Income[];
  expensesByMonth: Expense[];
  incomeByMonth: Income[];
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: {
    _id: '',
    name: '',
    amount: 0,
    currency: '',
  },
  walletCurrency: '',
  loading: false,
  expensesByDay: [],
  incomeByDay: [],
  expensesByMonth: [],
  incomeByMonth: [],
};
