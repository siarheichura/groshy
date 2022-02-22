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
export const walletExpenseCategoriesSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.wallet.expenseCategories
);
export const walletIncomeCategoriesSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.wallet.incomeCategories
);
export const moneyMoveByPeriodSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.moneyMoveByPeriod
);
