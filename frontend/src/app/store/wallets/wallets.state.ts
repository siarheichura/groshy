import { Wallet } from '@shared/interfaces/Wallet.interface'

export interface WalletsState {
  wallets: Wallet[]
  archivedWallets: Wallet[]
}

export const initialWalletsState: WalletsState = {
  wallets: [],
  archivedWallets: [],
}
