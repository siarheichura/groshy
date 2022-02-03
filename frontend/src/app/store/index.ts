import { Action, ActionReducerMap } from '@ngrx/store';
import { walletsReducer } from './wallets/wallets.reducers';

import { initialWalletsState, WalletsState } from './wallets/wallets.state';

export interface AppState {
  wallets: WalletsState;
}

export const initialAppState: AppState = {
  wallets: initialWalletsState,
};

export const reducers: ActionReducerMap<AppState, Action> = {
  wallets: walletsReducer,
};
