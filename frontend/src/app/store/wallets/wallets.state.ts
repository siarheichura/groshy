import { Wallet } from 'src/app/shared/classes/Wallet';
import { MoneyMoveDayItem } from 'src/app/shared/classes/MoneyMoveDayItem';
import { MoneyMoveCategory } from './../../shared/interfaces/MoneyMoveCategory.interface';
import { MoneyMoveStat } from 'src/app/shared/interfaces/MoneyMoveStat.interface';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  periodMoneyMove: MoneyMoveDayItem[];
  categories: MoneyMoveCategory[];
  statistics: MoneyMoveStat[];
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: {
    id: '',
    name: '',
    balance: 0,
    currency: '',
    date: null,
  },
  periodMoneyMove: [],
  categories: [],
  statistics: [],
};
