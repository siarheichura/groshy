import { createReducer, on } from '@ngrx/store';
import { initialSharedState } from './shared.state';
import { ChangeTab, LoadingToggle, ResetSharedState } from './shared.actions';
import { MoneyMoveTypes } from '@shared/enums/MoneyMoveTypes.enum';

export const sharedReducer = createReducer(
  initialSharedState,
  on(ResetSharedState, state => ({
    ...state,
    loading: false,
    currentTab: MoneyMoveTypes.Expense,
  })),
  on(LoadingToggle, (state, { payload }) => ({ ...state, loading: payload })),
  on(ChangeTab, (state, { payload }) => {
    return payload === MoneyMoveTypes.Expense
      ? { ...state, currentTab: MoneyMoveTypes.Expense }
      : { ...state, currentTab: MoneyMoveTypes.Income };
  })
);
