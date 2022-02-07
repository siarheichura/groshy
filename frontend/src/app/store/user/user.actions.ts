import { createAction, props } from '@ngrx/store';
import { User } from './../../shared/interfaces/User';

export enum UserActionsEnum {
  Login = '[USER] LOGIN',
  LoginSuccess = '[USER] LOGIN_SUCCESS',
  LoginFail = '[USER] LOGIN_FAIL',
}

export const Login = createAction(
  UserActionsEnum.Login,
  props<{ payload: User }>()
);
export const LoginSuccess = createAction(
  UserActionsEnum.LoginSuccess,
  props<{ payload: User }>()
);
export const LoginFail = createAction(UserActionsEnum.LoginFail);
