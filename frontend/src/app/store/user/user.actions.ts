import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';
import { User } from './../../shared/interfaces/User';

const MODULE_NAME = '[USER]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum UserActionsEnum {
  Login = 'LOGIN',
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginError = 'LOGIN_ERROR',
  Registration = 'REGISTRATION',
  RegistrationSuccess = 'REGISTRATION_SUCCESS',
  RegistrationError = 'REGISTRATION_ERROR',
  GetUserInfo = 'GET_USER_INFO',
  GetUserInfoSuccess = 'GET_USER_INFO_SUCCESS',
}

export const Login = createAction(
  getFullActionName(UserActionsEnum.Login),
  props<{ payload: User }>()
);
export const LoginSuccess = createAction(
  getFullActionName(UserActionsEnum.LoginSuccess),
  props<{ payload: boolean }>()
);
export const LoginError = createAction(
  getFullActionName(UserActionsEnum.LoginError),
  props<{ payload: boolean }>()
);
export const Registration = createAction(
  getFullActionName(UserActionsEnum.Registration),
  props<{ payload: User }>()
);
export const RegistrationSuccess = createAction(
  getFullActionName(UserActionsEnum.RegistrationSuccess),
  props<{ payload: boolean }>()
);
export const RegistrationError = createAction(
  getFullActionName(UserActionsEnum.RegistrationError),
  props<{ payload: boolean }>()
);
export const GetUserInfo = createAction(
  getFullActionName(UserActionsEnum.GetUserInfo)
);
export const GetUserInfoSuccess = createAction(
  getFullActionName(UserActionsEnum.GetUserInfoSuccess),
  props<{ payload: User }>()
);
