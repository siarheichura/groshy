import { WalletsState } from './wallets.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const featureSelector = createFeatureSelector<WalletsState>('wallets');

export const walletsSelector = createSelector(
  featureSelector,
  (state: WalletsState) => state.wallets
);
