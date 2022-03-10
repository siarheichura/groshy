import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import {
  GetWalletsSuccess,
  GetWalletSuccess,
  AddWalletSuccess,
  RemoveWalletSuccess,
  GetWalletCategoriesSuccess,
  GetMoneyMoveByPeriodSuccess,
  AddMoneyMoveItemSuccess,
  RemoveMoneyMoveItemSuccess,
  GetBasicCategoriesSuccess,
  AddCategorySuccess,
  RemoveCategorySuccess,
  ResetWalletState,
} from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(ResetWalletState, (state) => ({
    ...state,
    wallets: [],
    wallet: {
      id: '',
      name: '',
      balance: 0,
      currency: '',
    },
    periodMoneyMove: [],
    categories: [],
  })),
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
  on(GetBasicCategoriesSuccess, (state, { payload }) => ({
    ...state,
    categories: payload,
  })),
  on(GetWalletCategoriesSuccess, (state, { payload }) => ({
    ...state,
    categories: payload,
  })),
  on(AddCategorySuccess, (state, { payload }) => ({
    ...state,
    categories: [...state.categories, payload],
  })),
  on(RemoveCategorySuccess, (state, { payload }) => ({
    ...state,
    categories: state.categories.filter(
      (category) => category._id !== payload.id
    ),
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
          moneyMoveItems: [...day.moneyMoveItems, payload],
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
          moneyMoveItems: day.moneyMoveItems.filter(
            (item) => item._id !== payload._id
          ),
          moneyMoveSum: day.moneyMoveSum - payload.amount,
        };
      }
      return day;
    }),
  }))
);
