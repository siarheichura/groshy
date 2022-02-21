import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';
import {
  SignUpUser,
  LoginUser,
  UserInfo,
} from './../../shared/interfaces/User';

const MODULE_NAME = '[USER]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum UserActionsEnum {
  Login = 'LOGIN',
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginError = 'LOGIN_ERROR',
  Registration = 'REGISTRATION',
  RegistrationSuccess = 'REGISTRATION_SUCCESS',
  RegistrationError = 'REGISTRATION_ERROR',
  Logout = 'LOGOUT',
  GetUserInfo = 'GET_USER_INFO',
  GetUserInfoSuccess = 'GET_USER_INFO_SUCCESS',
}

export const Registration = createAction(
  getFullActionName(UserActionsEnum.Registration),
  props<{ payload: SignUpUser }>()
);
export const RegistrationSuccess = createAction(
  getFullActionName(UserActionsEnum.RegistrationSuccess)
);
export const RegistrationError = createAction(
  getFullActionName(UserActionsEnum.RegistrationError)
);

export const Login = createAction(
  getFullActionName(UserActionsEnum.Login),
  props<{ payload: LoginUser }>()
);
export const LoginSuccess = createAction(
  getFullActionName(UserActionsEnum.LoginSuccess)
);
export const LoginError = createAction(
  getFullActionName(UserActionsEnum.LoginError)
);

export const Logout = createAction(getFullActionName(UserActionsEnum.Logout));

export const GetUserInfo = createAction(
  getFullActionName(UserActionsEnum.GetUserInfo)
);
export const GetUserInfoSuccess = createAction(
  getFullActionName(UserActionsEnum.GetUserInfoSuccess),
  props<{ payload: UserInfo }>()
);
