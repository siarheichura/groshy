import { createAction, props } from '@ngrx/store';
import { Wallet } from './../../shared/interfaces/Wallet';

export const add = createAction('[WALLET] add', props<Wallet>());
export const remove = createAction('[WALLET] remove');
export const edit = createAction('[WALLET] edit');
