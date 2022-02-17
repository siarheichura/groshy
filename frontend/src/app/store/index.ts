import { Action, ActionReducerMap } from '@ngrx/store';

import { initialWalletsState, WalletsState } from './wallets/wallets.state';
import { UserState, initialUserState } from './user/user.state';
import { initialSharedState, SharedState } from './shared/shared.state';
import { walletsReducer } from './wallets/wallets.reducers';
import { userReducer } from './user/user.reducers';
import { sharedReducer } from './shared/shared.reducers';

export interface AppState {
  wallets: WalletsState;
  user: UserState;
  shared: SharedState;
}

export const initialAppState: AppState = {
  wallets: initialWalletsState,
  user: initialUserState,
  shared: initialSharedState,
};

export const reducers: ActionReducerMap<AppState, Action> = {
  wallets: walletsReducer,
  user: userReducer,
  shared: sharedReducer,
};
