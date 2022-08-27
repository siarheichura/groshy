import { createAction, props } from '@ngrx/store'

import { Wallet } from '@shared/interfaces/Wallet.interface'
import { getActionNameFn } from '@shared/helpers/action-name.helper'

const MODULE_NAME = '[WALLETS]'
const getFullActionName = getActionNameFn(MODULE_NAME)

enum WalletsActionsEnum {
  ResetWalletState = 'RESET_WALLET_STATE',
  GetWallets = 'GET_WALLETS',
  GetWalletsSuccess = 'GET_WALLETS_SUCCESS',
  AddWallet = 'ADD_WALLET',
  AddWalletSuccess = 'ADD_WALLET_SUCCESS',
  RemoveWallet = 'REMOVE_WALLET',
  RemoveWalletSuccess = 'REMOVE_WALLET_SUCCESS',
  EditWallet = 'EDIT_WALLET',
  EditWalletSuccess = 'EDIT_WALLET_SUCCESS',
}

export const ResetWalletState = createAction(
  getFullActionName(WalletsActionsEnum.ResetWalletState),
)
export const GetWallets = createAction(
  getFullActionName(WalletsActionsEnum.GetWallets),
)
export const GetWalletsSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletsSuccess),
  props<{ payload: { wallet: Wallet[] } }>(),
)
export const AddWallet = createAction(
  getFullActionName(WalletsActionsEnum.AddWallet),
  props<{ payload: { userId: string, wallet: Wallet } }>(),
)
export const AddWalletSuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddWalletSuccess),
  props<{ payload: Wallet }>(),
)
export const RemoveWallet = createAction(
  getFullActionName(WalletsActionsEnum.RemoveWallet),
  props<{ payload: { id: string } }>(),
)
export const RemoveWalletSuccess = createAction(
  getFullActionName(WalletsActionsEnum.RemoveWalletSuccess),
  props<{ payload: { id: string } }>(),
)
export const EditWallet = createAction(
  getFullActionName(WalletsActionsEnum.EditWallet),
  props<{ payload: { id: string; updatedWallet: Wallet } }>(),
)
export const EditWalletSuccess = createAction(
  getFullActionName(WalletsActionsEnum.EditWalletSuccess),
  props<{ payload: { updatedWallet: Wallet } }>(),
)
