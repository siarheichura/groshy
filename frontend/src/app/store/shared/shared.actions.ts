import { createAction, props } from '@ngrx/store';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';

const MODULE_NAME = '[SHARED]';
const getFullActionName = getActionNameFn(MODULE_NAME);

export enum SharedActionsEnum {
  Loading = 'LOADING',
}

export const Loading = createAction(
  getFullActionName(SharedActionsEnum.Loading),
  props<{ payload: boolean }>()
);
