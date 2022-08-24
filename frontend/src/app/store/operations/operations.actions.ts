import { createAction, props } from '@ngrx/store';

import { getActionNameFn } from "@shared/helpers/action-name.helper";
import { DayOperations, Operation } from "@shared/interfaces/Operation.interface";
import { Period } from "@store/operations/operations.state";
import { OperationsStatistics } from "@shared/interfaces/OperationsStatistics.interface";

const MODULE_NAME = '[OPERATIONS]'
const getFullActionName = getActionNameFn(MODULE_NAME)

enum OperationsActionsEnum {
  ResetOperationsState = 'RESET_OPERATIONS_STATE',
  SetOperationsType = 'SET_OPERATIONS_TYPE',
  SetOperationsPeriod = 'SET_OPERATIONS_PERIOD',
  GetOperations = 'GET_OPERATIONS',
  GetOperationsSuccess = 'GET_OPERATIONS_SUCCESS',
  AddOperation = 'ADD_OPERATION',
  EditOperation = 'EDIT_OPERATION',
  DeleteOperation = 'DELETE_OPERATION',
  GetOperationsStatistics = 'GET_OPERATIONS_STATISTICS',
  GetOperationsStatisticsSuccess = 'GET_OPERATIONS_STATISTICS_SUCCESS'
}

export const ResetOperationsState = createAction(
  getFullActionName(OperationsActionsEnum.ResetOperationsState)
)
export const SetOperationsType = createAction(
  getFullActionName(OperationsActionsEnum.SetOperationsType),
  props<{ payload: string }>()
)
export const SetOperationsPeriod = createAction(
  getFullActionName(OperationsActionsEnum.SetOperationsPeriod),
  props<{ payload: Period }>()
)
export const GetOperations = createAction(
  getFullActionName(OperationsActionsEnum.GetOperations)
)
export const GetOperationsSuccess = createAction(
  getFullActionName(OperationsActionsEnum.GetOperationsSuccess),
  props<{ payload: DayOperations[] }>()
)
export const AddOperation = createAction(
  getFullActionName(OperationsActionsEnum.AddOperation),
  props<{ payload: Operation }>()
)
export const EditOperation = createAction(
  getFullActionName(OperationsActionsEnum.EditOperation),
  props<{ payload: { id: string, operation: Operation } }>()
)
export const DeleteOperation = createAction(
  getFullActionName(OperationsActionsEnum.DeleteOperation),
  props<{ payload: { id: string } }>()
)
export const GetOperationsStatistics = createAction(
  getFullActionName(OperationsActionsEnum.GetOperationsStatistics)
)
export const GetOperationsStatisticsSuccess = createAction(
  getFullActionName(OperationsActionsEnum.GetOperationsStatisticsSuccess),
  props<{ payload: OperationsStatistics[] }>()
)
