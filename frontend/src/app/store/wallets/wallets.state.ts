import { Wallet } from './../../shared/interfaces/Wallet';

export interface WalletsState {
  wallets: Wallet[];
}

export const initialWalletsState: WalletsState = {
  wallets: [],
};
