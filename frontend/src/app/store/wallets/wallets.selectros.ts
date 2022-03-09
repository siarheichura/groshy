import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WalletsState } from './wallets.state';

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

export const categoriesSelector = (props?: { type: string }) =>
  createSelector(featureSelector, (state: WalletsState) =>
    props
      ? state.categories.filter((category) => category.type === props.type)
      : state.categories
  );
export const periodMoneyMoveSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.periodMoneyMove
);
