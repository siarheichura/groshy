import { initialUserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.Login, (state, { payload }) => ({
    ...state,
    user: payload,
  }))
);
