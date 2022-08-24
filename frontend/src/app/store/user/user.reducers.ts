import { initialUserState } from './user.state'
import { createReducer, on } from '@ngrx/store'
import * as UserActions from './user.actions'

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.LoginSuccess, (state, { payload }) => ({ ...state, user: payload, isAuth: true })),
  on(UserActions.GetUserSuccess, (state, { payload }) => ({ ...state, user: payload })),
  on(UserActions.Logout, state => ({ ...state, user: null, isAuth: false })),
)
