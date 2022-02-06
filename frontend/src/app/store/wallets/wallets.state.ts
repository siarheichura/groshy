import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
  wallet: Wallet | null;
  loading: boolean;
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  wallet: null,
  loading: false,
};
