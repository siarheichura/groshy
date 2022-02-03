import { initialWalletsState, WalletsState } from './wallets.state';
import { createReducer, on } from '@ngrx/store';
import {
  AddWallet,
  RemoveWallet,
  EditWallet,
  GetWallets,
  GetWalletsSuccess,
  ShowSpinner,
} from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
  })),
  on(ShowSpinner, (state, { payload }) => ({
    ...state,
    loading: payload,
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
