import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const featureSelector = createFeatureSelector<UserState>('user');

export const userInfoSelector = createSelector(
  featureSelector,
  (state: UserState) => state.user
);
