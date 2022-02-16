import { WalletsState } from './wallets.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<WalletsState>('wallets');

export const walletsSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.wallets
);
export const walletSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.wallet
);
export const walletCurrencySelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.wallet.currency
);
export const walletsLoadingSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.loading
);
export const walletExpensesByDaySelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.expensesByDay
);
export const walletIncomeByDaySelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.incomeByDay
);
export const walletExpensesByMonthSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.expensesByMonth
);
export const walletIncomeByMonthSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.incomeByMonth
);
