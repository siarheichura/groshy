import { Wallet } from '@shared/classes/Wallet';

export interface WalletsState {
  wallets: Wallet[]
  archivedWallets: Wallet[]
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  archivedWallets: [],
}
