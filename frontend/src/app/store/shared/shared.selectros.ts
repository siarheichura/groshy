import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const featureSelector = createFeatureSelector<SharedState>('shared');

export const loadingSelector = createSelector(
  featureSelector,
  (state: SharedState) => state.loading
);
