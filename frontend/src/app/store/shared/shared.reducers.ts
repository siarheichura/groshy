import { createReducer, on } from '@ngrx/store'
import { initialSharedState } from './shared.state'
import {
  SetCurrentTab,
  LoadingToggle,
  ResetSharedState,
} from './shared.actions'
import { OPERATION_TYPES } from '@shared/enums/OperationTypes.enum'

export const sharedReducer = createReducer(
  initialSharedState,
  on(ResetSharedState, state => ({
    ...state,
    loading: false,
    currentTab: OPERATION_TYPES.EXPENSE,
  })),
  on(LoadingToggle, (state, { payload }) => ({ ...state, loading: payload })),
  on(SetCurrentTab, (state, { payload }) => ({
    ...state,
    currentTab: payload,
  })),
)
