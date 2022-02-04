import { createAction, props } from '@ngrx/store';
import { Wallet } from './../../shared/interfaces/Wallet';

export enum WalletsActionsEnum {
  GetWallets = '[WALLETS] GET_WALLETS',
  GetWalletsSuccess = '[WALLETS] GET_WALLETS_SUCCESS',
  GetWallet = '[WALLETS] GET_WALLET',
  GetWalletSuccess = '[WALLETS] GET_WALLET_SUCCESS',
  AddWallet = '[WALLET] ADD_WALLET',
  RemoveWallet = '[WALLET] REMOVE_WALLET',
  EditWallet = '[WALLET] EDIT_WALLET',
}

export const GetWallets = createAction(WalletsActionsEnum.GetWallets);
export const GetWalletsSuccess = createAction(
  WalletsActionsEnum.GetWalletsSuccess,
  props<{ payload: Wallet[] }>()
);

export const GetWallet = createAction(
  WalletsActionsEnum.GetWallet,
  props<{ payload: { id: string } }>()
);
export const GetWalletSuccess = createAction(
  WalletsActionsEnum.GetWalletSuccess,
  props<{ payload: Wallet }>()
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
