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

export const walletsLoadingSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.loading
);
