import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import { GetWalletsSuccess, GetWalletSuccess } from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
  })),
  on(GetWalletSuccess, (state, { payload }) => ({
    ...state,
    wallet: payload,
  }))

  // on(AddWallet, (state, { payload }) => ({
  //   ...state,
  //   wallets: [...state.wallets, payload],
  // }))
  // on(RemoveWallet, (state, { payload }) => ({
  //   ...state,
  //   wallets: state.wallets.filter((wallet) => wallet._id !== payload.id),
  // }))
  // on(EditWallet, (state, { payload }) => state)
);
