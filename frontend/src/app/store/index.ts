import { Action, ActionReducerMap } from '@ngrx/store'

import { walletsReducer } from './wallets/wallets.reducers'
import { userReducer } from './user/user.reducers'
import { sharedReducer } from './shared/shared.reducers'
import { operationsReducer } from '@store/operations/operations.reducers'
import { categoriesReducer } from '@store/categories/categories.reducers'

import { initialWalletsState, WalletsState } from './wallets/wallets.state'
import { initialUserState, UserState } from './user/user.state'
import { initialOperationsState, OperationsState } from '@store/operations/operations.state'
import { initialCategoriesState, CategoriesState } from '@store/categories/categories.state'
import { initialSharedState, SharedState } from './shared/shared.state'

export interface AppState {
  wallets: WalletsState;
  operations: OperationsState;
  categories: CategoriesState;
  user: UserState;
  shared: SharedState;
}

export const initialAppState: AppState = {
  wallets: initialWalletsState,
  operations: initialOperationsState,
  categories: initialCategoriesState,
  user: initialUserState,
  shared: initialSharedState,
}

export const reducers: ActionReducerMap<AppState, Action> = {
  wallets: walletsReducer,
  operations: operationsReducer,
  categories: categoriesReducer,
  user: userReducer,
  shared: sharedReducer,
}
