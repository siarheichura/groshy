import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import {
  GetWalletsSuccess,
  AddWalletSuccess,
  RemoveWalletSuccess,
  ResetWalletState,
  EditWalletSuccess,
} from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(ResetWalletState, state => ({
    ...state,
    wallets: [],
    archivedWallets: []
  })),
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload.wallet.filter(wallet => !wallet.isArchived),
    archivedWallets: payload.wallet.filter(wallet => wallet.isArchived),
  })),


  // on(GetWalletSuccess, (state, { payload }) => ({
  //   ...state,
  //   wallet: payload,
  //   walletCurrency: payload.currency,
  // })),
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
  // on(GetWalletCategoriesSuccess, (state, { payload }) => ({
  //   ...state,
  //   categories: payload,
  // })),
  // on(AddCategorySuccess, (state, { payload }) => ({
  //   ...state,
  //   categories: [...state.categories, payload],
  // })),
  // on(RemoveCategorySuccess, (state, { payload }) => ({
  //   ...state,
  //   categories: state.categories.filter(category => category.id !== payload.id),
  // })),
  // on(GetMoneyMoveByPeriodSuccess, (state, { payload }) => ({
  //   ...state,
  //   periodMoneyMove: payload,
  // })),
  //
  // on(GetOperationsByPeriodSuccess, (state, { payload }) => ({
  //   ...state,
  //   operations: payload,
  // })),
  //
  // on(AddMoneyMoveItemSuccess, (state, { payload }) => ({
  //   ...state,
  //   periodMoneyMove: state.periodMoneyMove.map(day => {
  //     if (day.date.isSame(payload.date, 'day')) {
  //       return {
  //         ...day,
  //         moneyMoveItems: [...day.moneyMoveItems, payload],
  //         moneyMoveSum: day.moneyMoveSum + payload.amount,
  //       };
  //     }
  //     return day;
  //   }),
  // })),
  // on(RemoveMoneyMoveItemSuccess, (state, { payload }) => ({
  //   ...state,
  //   periodMoneyMove: state.periodMoneyMove.map(day => {
  //     if (day.date.isSame(payload.date, 'day')) {
  //       return {
  //         ...day,
  //         moneyMoveItems: day.moneyMoveItems.filter(
  //           item => item.id !== payload.id
  //         ),
  //         moneyMoveSum: day.moneyMoveSum - payload.amount,
  //       };
  //     }
  //     return day;
  //   }),
  // })),
  // on(GetMoneyMoveStatisticsSuccess, (state, { payload }) => ({
  //   ...state,
  //   statistics: payload.filter(item => item.amount !== 0),
  // })),
  // on(ToggleWalletHeaderVisibility, (state, { payload }) => ({
  //   ...state,
  //   isWalletHeaderVisible: payload
  // }))
);
