import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Wallet } from './../../shared/interfaces/Wallet';

export const featureSelector = createFeatureSelector<Wallet[]>('wallets');

export const walletsSelector = createSelector(
  featureSelector,
  (state) => state
);
