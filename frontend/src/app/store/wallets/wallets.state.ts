import { Wallet } from 'src/app/shared/classes/Wallet';
import { MoneyMoveDayItem } from 'src/app/shared/classes/MoneyMoveDayItem';
import { MoneyMoveCategory } from './../../shared/interfaces/MoneyMoveCategory.interface';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  periodMoneyMove: MoneyMoveDayItem[];
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
