import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';

const MODULE_NAME = '[SHARED]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum SharedActionsEnum {
  StartLoading = 'START_LOADING',
  StopLoading = 'STOP_LOADING',

  Loading = 'LOADING',
}

export const Loading = createAction(
  getFullActionName(SharedActionsEnum.Loading),
  props<{ payload: boolean }>()
);
