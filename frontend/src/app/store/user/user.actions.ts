import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';
import { SignUpUser, User, UserLogin } from './../../shared/interfaces/User';

const MODULE_NAME = '[USER]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum UserActionsEnum {
  Login = 'LOGIN',
  LoginSuccess = 'LOGIN_SUCCESS',
  Registration = 'REGISTRATION',
  RegistrationSuccess = 'REGISTRATION_SUCCESS',
  Logout = 'LOGOUT',
  Refresh = 'REFRESH',
  RefreshSuccess = 'REFRESH_SUCCESS',
  GetUser = 'GET_USER',
  GetUserSuccess = 'GET_USER_SUCCESS',
}

export const Registration = createAction(
  getFullActionName(UserActionsEnum.Registration),
  props<{ payload: SignUpUser }>()
);
export const RegistrationSuccess = createAction(
  getFullActionName(UserActionsEnum.RegistrationSuccess),
  props<{ payload: User }>()
);
export const Login = createAction(
  getFullActionName(UserActionsEnum.Login),
  props<{ payload: UserLogin }>()
);
export const LoginSuccess = createAction(
  getFullActionName(UserActionsEnum.LoginSuccess),
  props<{ payload: User }>()
);
export const Logout = createAction(getFullActionName(UserActionsEnum.Logout));
export const GetUser = createAction(
  getFullActionName(UserActionsEnum.GetUser),
  props<{ payload: string }>()
);
export const GetUserSuccess = createAction(
  getFullActionName(UserActionsEnum.GetUserSuccess),
  props<{ payload: User }>()
);
