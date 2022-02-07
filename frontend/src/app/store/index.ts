import { Action, ActionReducerMap } from '@ngrx/store';

import { initialWalletsState, WalletsState } from './wallets/wallets.state';
import { UserState, initialUserState } from './user/user.state';
import { walletsReducer } from './wallets/wallets.reducers';
import { userReducer } from './user/user.reducers';

export interface AppState {
  wallets: WalletsState;
  user: UserState;
}

export const initialAppState: AppState = {
  wallets: initialWalletsState,
  user: initialUserState,
};

export const reducers: ActionReducerMap<AppState, Action> = {
  wallets: walletsReducer,
  user: userReducer,
};
