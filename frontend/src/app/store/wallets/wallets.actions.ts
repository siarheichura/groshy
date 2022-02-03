import { createAction, props } from '@ngrx/store';
import { Wallet } from './../../shared/interfaces/Wallet';

export enum WalletsActionsEnum {
  GetWallets = '[WALLETS] GET_WALLETS',
  GetWalletsSuccess = '[WALLETS] GET_WALLETS_SUCCESS',
  AddWallet = '[WALLET] ADD_WALLET',
  RemoveWallet = '[WALLET] REMOVE_WALLET',
  EditWallet = '[WALLET] EDIT_WALLET',
  ShowSpinner = '[WALLET] SHOW_SPINNER',
}

export const GetWallets = createAction(WalletsActionsEnum.GetWallets);
export const GetWalletsSuccess = createAction(
  WalletsActionsEnum.GetWalletsSuccess,
  props<{ payload: Wallet[] }>()
);
export const AddWallet = createAction(
  WalletsActionsEnum.AddWallet,
  props<{ payload: Wallet }>()
);
export const RemoveWallet = createAction(
  WalletsActionsEnum.RemoveWallet,
  props<{ payload: { id: string } }>()
);
export const EditWallet = createAction(
  WalletsActionsEnum.EditWallet,
  props<{ payload: { id: string; updatedWallet: Wallet } }>()
);
export const ShowSpinner = createAction(
  WalletsActionsEnum.ShowSpinner,
  props<{ payload: boolean }>()
);
