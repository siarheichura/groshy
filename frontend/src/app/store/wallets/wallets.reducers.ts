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
  AddCategorySuccess,
  RemoveCategorySuccess,
  ResetWalletState,
  GetMoneyMoveStatisticsSuccess,
  GetFirstMoneyMoveDateSuccess,
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
    firstMoneyMoveDate: null,
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
      (category) => category.id !== payload.id
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
            (item) => item.id !== payload.id
          ),
          moneyMoveSum: day.moneyMoveSum - payload.amount,
        };
      }
      return day;
    }),
  })),
  on(GetMoneyMoveStatisticsSuccess, (state, { payload }) => ({
    ...state,
    statistics: payload.filter((item) => item.amount !== 0),
  })),
  on(GetFirstMoneyMoveDateSuccess, (state, { payload }) => ({
    ...state,
    firstMoneyMoveDate: payload.date,
  }))
);
