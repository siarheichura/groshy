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
  UpdateUserInfo = 'UPADTE_USER_INFO',
  UpdateUserInfoSuccess = 'UPADTE_USER_INFO_SUCCESS',
  ChangePassword = 'CHANGE_PASSWORD',
  ChangePasswordSuccess = 'CHANGE_PASSWORD_SUCCESS',
  ChangePasswordError = 'CHANGE_PASSWORD_ERROR',
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
export const UpdateUserInfo = createAction(
  getFullActionName(UserActionsEnum.UpdateUserInfo),
  props<{ payload: { id: string; username: string; email: string } }>()
);
export const UpdateUserInfoSuccess = createAction(
  getFullActionName(UserActionsEnum.UpdateUserInfoSuccess),
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
