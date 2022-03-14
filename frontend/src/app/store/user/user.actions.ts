import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';
import { SignUpUser, User, UserLogin } from './../../shared/interfaces/User';

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
  CheckAuth = 'CHECK_AUTH',
  CheckAuthSuccess = 'CHECK_AUTH_SUCCESS',
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
export const RegistrationError = createAction(
  getFullActionName(UserActionsEnum.RegistrationError)
);
export const Login = createAction(
  getFullActionName(UserActionsEnum.Login),
  props<{ payload: UserLogin }>()
);
export const LoginSuccess = createAction(
  getFullActionName(UserActionsEnum.LoginSuccess),
  props<{ payload: User }>()
);
export const LoginError = createAction(
  getFullActionName(UserActionsEnum.LoginError)
);
export const Logout = createAction(getFullActionName(UserActionsEnum.Logout));
export const CheckAuth = createAction(
  getFullActionName(UserActionsEnum.CheckAuth)
);
export const CheckAuthSuccess = createAction(
  getFullActionName(UserActionsEnum.CheckAuthSuccess),
  props<{ payload: User }>()
);

export const GetUser = createAction(
  getFullActionName(UserActionsEnum.GetUser),
  props<{ payload: string }>()
);
export const GetUserSuccess = createAction(
  getFullActionName(UserActionsEnum.GetUserSuccess),
  props<{ payload: User }>()
);
