import { Wallet } from './../../shared/interfaces/Wallet';
import { DayMoneyMove } from 'src/app/shared/interfaces/DayMoneyMove';

export interface WalletsState {
  wallets: Wallet[];
  moneyMoveByPeriod: DayMoneyMove[];
  wallet: Wallet;
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  moneyMoveByPeriod: [],
  wallet: {
    _id: '',
    name: '',
    amount: 0,
    currency: '',
    expenseCategories: [],
    incomeCategories: [],
  },
};
