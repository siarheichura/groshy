import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet | null;
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: null,
};
