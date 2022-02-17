import { initialSharedState } from './shared.state';
import { createReducer } from '@ngrx/store';

export const sharedReducer = createReducer(initialSharedState);
