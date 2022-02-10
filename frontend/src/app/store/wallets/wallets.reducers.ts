import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import {
  GetWallets,
  GetWalletsSuccess,
  GetWalletSuccess,
  GetInitWalletExpensesSuccess,
  GetInitWalletIncomeSuccess,
} from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(GetWallets, (state) => ({
    ...state,
    loading: true,
  })),
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
    loading: false,
  })),
  on(GetWalletSuccess, (state, { payload }) => ({
    ...state,
    wallet: payload,
    loading: false,
    walletCurrency: payload.currency,
  })),
  on(GetInitWalletExpensesSuccess, (state, { payload }) => ({
    ...state,
    initialExpenses: payload,
  })),
  on(GetInitWalletIncomeSuccess, (state, { payload }) => ({
    ...state,
    initialIncome: payload,
  }))
);
