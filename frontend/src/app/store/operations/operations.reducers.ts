import { createReducer, on } from '@ngrx/store'
import { initialOperationsState } from '@store/operations/operations.state'
import {
  GetOperationsStatisticsSuccess,
  GetOperationsSuccess,
  ResetOperationsState,
  SetOperationsPeriod,
  SetOperationsType,
} from '@store/operations/operations.actions'

export const operationsReducer = createReducer(
  initialOperationsState,
  on(ResetOperationsState, state => ({ ...state, type: null, period: null, operations: [], statistics: [] })),
  on(SetOperationsType, (state, { payload }) => ({ ...state, type: payload })),
  on(SetOperationsPeriod, (state, { payload }) => ({ ...state, period: payload })),
  on(GetOperationsSuccess, (state, { payload }) => ({
    ...state,
    operations: payload.filter(operation => operation.operations.length),
  })),
  on(GetOperationsStatisticsSuccess, (state, { payload }) => ({ ...state, statistics: payload })),
)
