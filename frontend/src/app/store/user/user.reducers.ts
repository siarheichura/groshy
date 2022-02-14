import { initialUserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.Login, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.LoginSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    isLogin: payload,
  })),
  on(UserActions.LoginError, (state, { payload }) => ({
    ...state,
    loading: false,
    isLogin: payload,
  })),
  on(UserActions.Registration, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.RegistrationSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    isRegistrate: payload,
  })),
  on(UserActions.RegistrationError, (state, { payload }) => ({
    ...state,
    loading: false,
    isRegistrate: payload,
  })),
  on(UserActions.GetUserInfoSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
  }))
);
