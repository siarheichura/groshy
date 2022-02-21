import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';

const MODULE_NAME = '[SHARED]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum SharedActionsEnum {
  Loading = 'LOADING',
  PrintNzMessageSuccess = 'PRINT_NZ_MESSAGE_SUCCESS',
  PrintNzMessageError = 'PRINT_NZ_MESSAGE_ERROR',
}

export const Loading = createAction(
  getFullActionName(SharedActionsEnum.Loading),
  props<{ payload: boolean }>()
);
export const PrintNzMessageSuccess = createAction(
  getFullActionName(SharedActionsEnum.PrintNzMessageSuccess),
  props<{ payload: string }>()
);
export const PrintNzMessageError = createAction(
  getFullActionName(SharedActionsEnum.PrintNzMessageError),
  props<{ payload: string }>()
);
