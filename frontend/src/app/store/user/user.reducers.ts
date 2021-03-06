import { initialUserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import { User } from '@shared/interfaces/User';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.RegistrationSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
    isAuth: true,
  })),
  on(UserActions.LoginSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
    isAuth: true,
  })),
  on(UserActions.Logout, state => {
    return {
      ...state,
      user: {} as User,
      isAuth: false,
    };
  }),
  on(UserActions.GetUserSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
  })),
  on(UserActions.UpdateUserInfoSuccess, (state, { payload }) => ({
    ...state,
    user: payload,
  }))
);
