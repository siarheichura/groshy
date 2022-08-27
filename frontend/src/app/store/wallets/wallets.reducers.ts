import { createReducer, on } from '@ngrx/store'
import { initialWalletsState } from './wallets.state'
import {
  GetWalletsSuccess,
  AddWalletSuccess,
  RemoveWalletSuccess,
  ResetWalletState,
  EditWalletSuccess,
} from './wallets.actions'

export const walletsReducer = createReducer(
  initialWalletsState,
  on(ResetWalletState, state => ({
    ...state,
    wallets: [],
    archivedWallets: [],
  })),
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload.wallet.filter(wallet => !wallet.isArchived),
    archivedWallets: payload.wallet.filter(wallet => wallet.isArchived),
  })),
  on(AddWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: [...state.wallets, payload],
  })),
  on(EditWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: [...state.wallets.filter(wallet => wallet.id !== payload.updatedWallet.id), payload.updatedWallet],
  })),
  on(RemoveWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: state.wallets.filter(wallet => wallet.id !== payload.id),
  })),
)
