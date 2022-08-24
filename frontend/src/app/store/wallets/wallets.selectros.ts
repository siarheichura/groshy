import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WalletsState } from './wallets.state';

export const featureSelector = createFeatureSelector<WalletsState>('wallets')

export const walletsSelector = createSelector(featureSelector,state => state.wallets)
export const archivedWalletsSelector = createSelector(featureSelector,state => state.archivedWallets)
