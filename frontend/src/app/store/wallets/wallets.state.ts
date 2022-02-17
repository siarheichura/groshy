import { Dayjs } from 'dayjs';
import { Expense } from 'src/app/shared/interfaces/Expense';
import { Income } from './../../shared/interfaces/Income';
import { Wallet } from './../../shared/interfaces/Wallet';

export interface DayMoneyMove {
  date: Dayjs;
  expenses: Expense[];
  income: Income[];
  expensesSum: number;
  incomeSum: number;
}

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  walletCurrency: string;
  loading: boolean;
  expensesByDay: Expense[];
  incomeByDay: Income[];
  monthMoneyMove: DayMoneyMove[];
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
  monthMoneyMove: [],
};
