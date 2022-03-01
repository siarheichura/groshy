import { createAction, props } from '@ngrx/store';
import { Dayjs } from 'dayjs';

import { MoneyMoveItem } from './../../shared/interfaces/DayMoneyMove';
import { DayMoneyMoveItem } from './../../shared/interfaces/DayMoneyMove';
import { Wallet } from './../../shared/interfaces/Wallet';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';

const MODULE_NAME = '[WALLETS]';
const getFullActionName = getActionNameFn(MODULE_NAME);

enum WalletsActionsEnum {
  GetWallets = 'GET_WALLETS',
  GetWalletsSuccess = 'GET_WALLETS_SUCCESS',
  GetWallet = 'GET_WALLET',
  GetWalletSuccess = 'GET_WALLET_SUCCESS',
  AddWallet = 'ADD_WALLET',
  AddWalletSuccess = 'ADD_WALLET_SUCCESS',
  RemoveWallet = 'REMOVE_WALLET',
  RemoveWalletSuccess = 'REMOVE_WALLET_SUCCESS',
  EditWallet = 'EDIT_WALLET',
  GetWalletCategories = 'GET_WALLET_CATEGORIES',
  GetWalletCategoriesSuccess = 'GET_WALLET_CATEGORIES_SUCCESS',
  GetMoneyMoveByPeriod = 'GET_MONEY_MOVE_BY_PERIOD',
  GetMoneyMoveByPeriodSuccess = 'GET_MONEY_MOVE_BY_PERIOD_SUCCESS',
  AddMoneyMoveItem = 'ADD_MONEY_MOVE_ITEM',
  AddMoneyMoveItemSuccess = 'ADD_MONEY_MOVE_ITEM_SUCCESS',
  RemoveMoneyMoveItem = 'REMOVE_MONEY_MOVE_ITEM',
  RemoveMoneyMoveItemSuccess = 'REMOVE_MONEY_MOVE_ITEM_SUCCESS',
  EditMoneyMoveItem = 'EDIT_MONEY_MOVE_ITEM',
  EditMoneyMoveItemSuccess = 'EDIT_MONEY_MOVE_ITEM_SUCCESS',
}

export const GetWallets = createAction(
  getFullActionName(WalletsActionsEnum.GetWallets)
);
export const GetWalletsSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletsSuccess),
  props<{ payload: Wallet[] }>()
);
export const GetWallet = createAction(
  getFullActionName(WalletsActionsEnum.GetWallet),
  props<{ payload: { id: string } }>()
);
export const GetWalletSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletSuccess),
  props<{ payload: Wallet }>()
);
export const AddWallet = createAction(
  getFullActionName(WalletsActionsEnum.AddWallet),
  props<{ payload: Wallet }>()
);
export const AddWalletSuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddWalletSuccess),
  props<{ payload: Wallet }>()
);
export const RemoveWallet = createAction(
  getFullActionName(WalletsActionsEnum.RemoveWallet),
  props<{ payload: { id: string } }>()
);
export const RemoveWalletSuccess = createAction(
  getFullActionName(WalletsActionsEnum.RemoveWalletSuccess),
  props<{ payload: { id: string } }>()
);
export const EditWallet = createAction(
  getFullActionName(WalletsActionsEnum.EditWallet),
  props<{ payload: { id: string; updatedWallet: Wallet } }>()
);
export const GetCategories = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletCategories),
  props<{ payload: { walletId: string; type: string } }>()
);
export const GetCategoriesSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletCategoriesSuccess),
  props<{
    payload: { _id: string; name: string }[];
  }>()
);

export const GetMoneyMoveByPeriod = createAction(
  getFullActionName(WalletsActionsEnum.GetMoneyMoveByPeriod),
  props<{
    payload: {
      walletId: string;
      type: string;
      startDate: Dayjs;
      finishDate?: Dayjs;
    };
  }>()
);
export const GetMoneyMoveByPeriodSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetMoneyMoveByPeriodSuccess),
  props<{ payload: DayMoneyMoveItem[] }>()
);
export const AddMoneyMoveItem = createAction(
  getFullActionName(WalletsActionsEnum.AddMoneyMoveItem),
  props<{ payload: { type: string; walletId: string; item: MoneyMoveItem } }>()
);
export const AddMoneyMoveItemSuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddMoneyMoveItemSuccess),
  props<{ payload: MoneyMoveItem }>()
);

export const RemoveMoneyMoveItem = createAction(
  getFullActionName(WalletsActionsEnum.RemoveMoneyMoveItem),
  props<{ payload: { type: string; itemId: string; walletId: string } }>()
);
export const RemoveMoneyMoveItemSuccess = createAction(
  getFullActionName(WalletsActionsEnum.RemoveMoneyMoveItemSuccess),
  props<{ payload: MoneyMoveItem }>()
);
export const EditMoneyMoveItem = createAction(
  getFullActionName(WalletsActionsEnum.EditMoneyMoveItem),
  props<{
    payload: {
      type: string;
      itemId: string;
      updatedItem: MoneyMoveItem;
      walletId: string;
      startDate: Dayjs;
      finishDate?: Dayjs;
    };
  }>()
);
