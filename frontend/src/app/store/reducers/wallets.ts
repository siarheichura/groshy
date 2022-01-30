import { WalletsState } from './index';
import { Wallet } from './../../shared/interfaces/Wallet';
import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export const add = createAction('[WALLET] add', props<Wallet>());
export const remove = createAction('[WALLET] remove');
export const edit = createAction('[WALLET] edit');

export const initialState: Wallet[] = [];

export const walletsReducer = createReducer(
  initialState,
  on(add, (state, wallet) => [...state, wallet]),
  on(remove, (state) => [...state]),
  on(edit, (state) => [...state])
);

// selectors
export const featureSelector = createFeatureSelector<WalletsState>('wallets');

export const walletsSelector = createSelector(
  featureSelector,
  (state) => state.wallets
);
