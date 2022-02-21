import { initialSharedState } from './shared.state';
import { createReducer, on } from '@ngrx/store';
import { ChangeTab, Loading } from './shared.actions';
import { TabsEnum } from 'src/app/shared/enums/TabsEnum';

export const sharedReducer = createReducer(
  initialSharedState,
  on(Loading, (state, { payload }) => ({ ...state, loading: payload })),
  on(ChangeTab, (state, { payload }) => {
    return state.currentTab === TabsEnum.Expenses
      ? { ...state, currentTab: TabsEnum.Income }
      : { ...state, currentTab: TabsEnum.Expenses };
  })
);
