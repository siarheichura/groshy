import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import {
  GetWalletsSuccess,
  GetWalletSuccess,
  AddWalletSuccess,
  RemoveWalletSuccess,
  GetCategoriesSuccess,
  GetMoneyMoveByPeriodSuccess,
  AddMoneyMoveItemSuccess,
  RemoveMoneyMoveItemSuccess,
} from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
  })),
  on(GetWalletSuccess, (state, { payload }) => ({
    ...state,
    wallet: payload,
    walletCurrency: payload.currency,
  })),
  on(AddWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: [...state.wallets, payload],
  })),
  on(RemoveWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: state.wallets.filter((wallet) => wallet.id !== payload.id),
  })),
  on(GetCategoriesSuccess, (state, { payload }) => ({
    ...state,
    categories: payload,
  })),
  on(GetMoneyMoveByPeriodSuccess, (state, { payload }) => ({
    ...state,
    periodMoneyMove: payload,
  })),
  on(AddMoneyMoveItemSuccess, (state, { payload }) => ({
    ...state,
    periodMoneyMove: state.periodMoneyMove.map((day) => {
      if (day.date.isSame(payload.date, 'day')) {
        return {
          ...day,
          moneyMove: [...day.moneyMove, payload],
          moneyMoveSum: day.moneyMoveSum + payload.amount,
        };
      }
      return day;
    }),
  })),
  on(RemoveMoneyMoveItemSuccess, (state, { payload }) => ({
    ...state,
    periodMoneyMove: state.periodMoneyMove.map((day) => {
      if (day.date.isSame(payload.date, 'day')) {
        return {
          ...day,
          moneyMove: day.moneyMove.filter((item) => item._id !== payload._id),
          moneyMoveSum: day.moneyMoveSum - payload.amount,
        };
      }
      return day;
    }),
  }))
);
