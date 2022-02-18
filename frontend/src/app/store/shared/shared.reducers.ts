import { initialSharedState } from './shared.state';
import { createReducer, on } from '@ngrx/store';
import { Loading } from './shared.actions';

export const sharedReducer = createReducer(
  initialSharedState,
  on(Loading, (state, { payload }) => ({ ...state, loading: payload }))
);
