import { initialUserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/User';
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
  on(UserActions.Logout, (state) => {
    return {
      ...state,
      isAuth: false,
      user: {} as User,
    };
  }),
  on(UserActions.CheckAuthSuccess, (state, { payload }) => {
    return {
      ...state,
      isAuth: true,
      user: payload,
    };
  }),
  on(UserActions.GetUserSuccess, (state, { payload }) => ({
    ...state,
    testUser: payload,
  }))
);
