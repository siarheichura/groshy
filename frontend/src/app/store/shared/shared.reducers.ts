import { MoneyMoveTypes } from './../../shared/enums/MoneyMoveTypes.enum';
import { initialSharedState } from './shared.state';
import { createReducer, on } from '@ngrx/store';
import { ChangeTab, Loading } from './shared.actions';

export const sharedReducer = createReducer(
  initialSharedState,
  on(Loading, (state, { payload }) => ({ ...state, loading: payload })),
  on(ChangeTab, (state, { payload }) => {
    return payload === MoneyMoveTypes.Expense
      ? { ...state, currentTab: MoneyMoveTypes.Expense }
      : { ...state, currentTab: MoneyMoveTypes.Income };
  })
);
