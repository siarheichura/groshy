import { createAction, props } from '@ngrx/store'
import { getActionNameFn } from '@shared/helpers/action-name.helper'
import { RegistrationUser, User, UserLogin } from '@shared/interfaces/User'

const MODULE_NAME = '[USER]'
const getFullActionName = getActionNameFn(MODULE_NAME)

export enum UserActionsEnum {
  Registration = 'REGISTRATION',
  RegistrationSuccess = 'REGISTRATION_SUCCESS',
  Login = 'LOGIN',
  LoginSuccess = 'LOGIN_SUCCESS',
  GetUser = 'GET_USER',
  GetUserSuccess = 'GET_USER_SUCCESS',
  Logout = 'LOGOUT',
}

export const Registration = createAction(getFullActionName(UserActionsEnum.Registration), props<{ payload: RegistrationUser }>())
export const RegistrationSuccess = createAction(getFullActionName(UserActionsEnum.RegistrationSuccess))
export const Login = createAction(getFullActionName(UserActionsEnum.Login), props<{ payload: UserLogin }>())
export const LoginSuccess = createAction(getFullActionName(UserActionsEnum.LoginSuccess), props<{ payload: User }>())
export const GetUser = createAction(getFullActionName(UserActionsEnum.GetUser))
export const GetUserSuccess = createAction(getFullActionName(UserActionsEnum.GetUserSuccess), props<{ payload: User }>())
export const Logout = createAction(getFullActionName(UserActionsEnum.Logout))
