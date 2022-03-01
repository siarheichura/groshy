import {
  DayMoneyMoveItem,
  MoneyMoveCategory,
} from './../../shared/interfaces/DayMoneyMove';
import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  periodMoneyMove: DayMoneyMoveItem[];
  categories: MoneyMoveCategory[];
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: {
    id: '',
    name: '',
    balance: 0,
    currency: '',
  },
  periodMoneyMove: [],
  categories: [],
};
