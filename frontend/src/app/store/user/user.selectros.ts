import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const featureSelector = createFeatureSelector<UserState>('user');

export const userSelector = createSelector(
  featureSelector,
  (state: UserState) => state.user
);

export const isUserAuthSelector = createSelector(
  featureSelector,
  state => state.isAuth
);
