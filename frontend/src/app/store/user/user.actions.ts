import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';
import {
  SignUpUser,
  User,
  UserLogin,
  Passwords,
} from './../../shared/interfaces/User';

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
  ChangePassword = 'CHANGE_PASSWORD',
  ChangePasswordSuccess = 'CHANGE_PASSWORD_SUCCESS',
  ChangePasswordError = 'CHANGE_PASSWORD_ERROR',
  ChangeUsername = 'CHANGE_USERNAME',
  ChangeUsernameSuccess = 'CHANGE_USERNAME_SUCCESS',
  ChangeUsernameError = 'CHANGE_USERNAME_ERROR',
  ChangeEmail = 'CHANGE_EMAIL',
  ChangeEmailSuccess = 'CHANGE_EMAIL_SUCCESS',
  ChangeEmailError = 'CHANGE_EMAIL_ERROR',
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
export const ChangePassword = createAction(
  getFullActionName(UserActionsEnum.ChangePassword),
  props<{
    payload: {
      userId: string;
      passwords: Passwords;
    };
  }>()
);
export const ChangePasswordSuccess = createAction(
  getFullActionName(UserActionsEnum.ChangePasswordSuccess),
  props<{ payload: User }>()
);
export const ChangePasswordError = createAction(
  getFullActionName(UserActionsEnum.ChangePasswordError)
);
export const ChangeUsername = createAction(
  getFullActionName(UserActionsEnum.ChangeUsername),
  props<{
    payload: {
      userId: string;
      username: string;
    };
  }>()
);
export const ChangeUsernameSuccess = createAction(
  getFullActionName(UserActionsEnum.ChangeUsernameSuccess),
  props<{ payload: User }>()
);
export const ChangeUsernameError = createAction(
  getFullActionName(UserActionsEnum.ChangeUsernameError)
);
export const ChangeEmail = createAction(
  getFullActionName(UserActionsEnum.ChangeEmail),
  props<{
    payload: {
      userId: string;
      email: string;
    };
  }>()
);
export const ChangeEmailSuccess = createAction(
  getFullActionName(UserActionsEnum.ChangeEmailSuccess),
  props<{ payload: User }>()
);
export const ChangeEmailError = createAction(
  getFullActionName(UserActionsEnum.ChangeEmailError)
);
