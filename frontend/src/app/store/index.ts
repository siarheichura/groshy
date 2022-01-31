import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { walletsReducer } from './wallets/wallets.reducers';
import { Wallet } from '../shared/interfaces/Wallet';

export interface State {
  wallets: Wallet[];
}

export const reducers: ActionReducerMap<State> = {
  wallets: walletsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
