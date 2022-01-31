import { createReducer, on } from '@ngrx/store';

import { Wallet } from './../../shared/interfaces/Wallet';
import { add, remove, edit } from './wallets.actions';

export const initialState: Wallet[] = [];

export const walletsReducer = createReducer(
  initialState,
  on(add, (state, wallet) => [...state, wallet]),
  on(remove, (state) => [...state]),
  on(edit, (state) => [...state])
);
