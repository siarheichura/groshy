import { Wallet } from './../../shared/interfaces/Wallet';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { walletsReducer } from './wallets';

export interface WalletsState {
  wallets: Wallet[];
}

export const reducers: ActionReducerMap<WalletsState> = {
  wallets: walletsReducer,
};

export const metaReducers: MetaReducer<WalletsState>[] = !environment.production
  ? []
  : [];
