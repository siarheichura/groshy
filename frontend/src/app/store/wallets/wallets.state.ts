import { DayMoneyMove } from 'src/app/shared/interfaces/DayMoneyMove';
import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet;
  moneyMoveByPeriod: DayMoneyMove[];
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: {
    _id: '',
    name: '',
    amount: 0,
    currency: '',
  },
  moneyMoveByPeriod: [],
};
