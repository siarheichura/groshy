import { initialUserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import { environment } from './../../../environments/environment';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.GetUserInfoSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
  })),
  on(UserActions.Logout, (state) => {
    localStorage.removeItem(environment.LocalStorageUserKey);
    return state;
  })
);
