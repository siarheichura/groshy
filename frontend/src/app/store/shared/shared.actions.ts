import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from '@shared/helpers/action-name.helper';

const MODULE_NAME = '[SHARED]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum SharedActionsEnum {
  ResetSharedState = 'RESET_SHARED_STATE',
  LoadingToggle = 'LOADING_TOGGLE',
  PrintNzMessageSuccess = 'PRINT_NZ_MESSAGE_SUCCESS',
  PrintNzMessageError = 'PRINT_NZ_MESSAGE_ERROR',
  ChangeTab = 'CHANGE_TAB',
}

export const ResetSharedState = createAction(
  getFullActionName(SharedActionsEnum.ResetSharedState)
);
export const LoadingToggle = createAction(
  getFullActionName(SharedActionsEnum.LoadingToggle),
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
export const ChangeTab = createAction(
  getFullActionName(SharedActionsEnum.ChangeTab),
  props<{ payload: string }>()
);
