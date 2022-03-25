import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WalletsState } from './wallets.state';

export const featureSelector = createFeatureSelector<WalletsState>('wallets');

export const walletsSelector = createSelector(
  featureSelector,
  (state) => state.wallets
);
export const walletSelector = createSelector(
  featureSelector,
  (state) => state.wallet
);
export const walletCurrencySelector = createSelector(
  featureSelector,
  (state) => state.wallet.currency
);
export const walletCreationDateSelector = createSelector(
  featureSelector,
  (state) => state.wallet.date
);
export const categoriesSelector = (props?: { type: string }) =>
  createSelector(featureSelector, (state) =>
    props
      ? state.categories.filter((category) => category.type === props.type)
      : state.categories
  );
export const periodMoneyMoveSelector = createSelector(
  featureSelector,
  (state) => state.periodMoneyMove
);
export const moneyMoveStatisticsSelector = createSelector(
  featureSelector,
  (state) => state.statistics
);
