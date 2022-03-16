import { MoneyMoveStat } from './../../shared/interfaces/MoneyMoveStat.interface';
import { createAction, props } from '@ngrx/store';
import { Dayjs } from 'dayjs';

import { Wallet } from 'src/app/shared/classes/Wallet';

import { MoneyMoveItem } from './../../shared/interfaces/MoneyMoveItem.interface';
import { MoneyMoveCategory } from './../../shared/interfaces/MoneyMoveCategory.interface';
import { MoneyMoveDayItem } from 'src/app/shared/classes/MoneyMoveDayItem';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';

const MODULE_NAME = '[WALLETS]';
const getFullActionName = getActionNameFn(MODULE_NAME);

enum WalletsActionsEnum {
  ResetWalletState = 'RESET_WALLET_STATE',
  GetWallets = 'GET_WALLETS',
  GetWalletsSuccess = 'GET_WALLETS_SUCCESS',
  GetWallet = 'GET_WALLET',
  GetWalletSuccess = 'GET_WALLET_SUCCESS',
  AddWallet = 'ADD_WALLET',
  AddWalletSuccess = 'ADD_WALLET_SUCCESS',
  RemoveWallet = 'REMOVE_WALLET',
  RemoveWalletSuccess = 'REMOVE_WALLET_SUCCESS',
  EditWallet = 'EDIT_WALLET',
  GetBasicCategories = 'GET_BASIC_CATEGORIES',
  GetBasicCategoriesSuccess = 'GET_BASIC_CATEGORIES_SUCCESS',
  GetWalletCategories = 'GET_WALLET_CATEGORIES',
  GetWalletCategoriesSuccess = 'GET_WALLET_CATEGORIES_SUCCESS',
  AddCategory = 'ADD_CATEGORY',
  AddCategorySuccess = 'ADD_CATEGORY_SUCCESS',
  RemoveCategory = 'REMOVE_CATEGORY',
  RemoveCategorySuccess = 'REMOVE_CATEGORY_SUCCESS',
  GetMoneyMoveByPeriod = 'GET_MONEY_MOVE_BY_PERIOD',
  GetMoneyMoveByPeriodSuccess = 'GET_MONEY_MOVE_BY_PERIOD_SUCCESS',
  AddMoneyMoveItem = 'ADD_MONEY_MOVE_ITEM',
  AddMoneyMoveItemSuccess = 'ADD_MONEY_MOVE_ITEM_SUCCESS',
  RemoveMoneyMoveItem = 'REMOVE_MONEY_MOVE_ITEM',
  RemoveMoneyMoveItemSuccess = 'REMOVE_MONEY_MOVE_ITEM_SUCCESS',
  EditMoneyMoveItem = 'EDIT_MONEY_MOVE_ITEM',
  EditMoneyMoveItemSuccess = 'EDIT_MONEY_MOVE_ITEM_SUCCESS',
  GetMoneyMoveStatistics = 'GET_MONEY_MOVE_STATISTICS',
  GetMoneyMoveStatisticsSuccess = 'GET_MONEY_MOVE_STAT_STATISTICS',
}

export const ResetWalletState = createAction(
  getFullActionName(WalletsActionsEnum.ResetWalletState)
);
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
export const GetBasicCategories = createAction(
  getFullActionName(WalletsActionsEnum.GetBasicCategories)
);
export const GetBasicCategoriesSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetBasicCategoriesSuccess),
  props<{ payload: MoneyMoveCategory[] }>()
);
export const GetWalletCategories = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletCategories),
  props<{ payload: { walletId: string } }>()
);
export const GetWalletCategoriesSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetWalletCategoriesSuccess),
  props<{
    payload: MoneyMoveCategory[];
  }>()
);
export const AddCategory = createAction(
  getFullActionName(WalletsActionsEnum.AddCategory),
  props<{ payload: { walletId: string; category: MoneyMoveCategory } }>()
);
export const AddCategorySuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddCategorySuccess),
  props<{
    payload: MoneyMoveCategory;
  }>()
);
export const RemoveCategory = createAction(
  getFullActionName(WalletsActionsEnum.RemoveCategory),
  props<{ payload: { id: string } }>()
);
export const RemoveCategorySuccess = createAction(
  getFullActionName(WalletsActionsEnum.RemoveCategorySuccess),
  props<{
    payload: { id: string };
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
  props<{ payload: MoneyMoveDayItem[] }>()
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
export const GetMoneyMoveStatistics = createAction(
  getFullActionName(WalletsActionsEnum.GetMoneyMoveStatistics),
  props<{
    payload: {
      walletId: string;
      type: string;
      startDate: Dayjs;
      finishDate?: Dayjs;
    };
  }>()
);
export const GetMoneyMoveStatisticsSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetMoneyMoveStatisticsSuccess),
  props<{
    payload: MoneyMoveStat[];
  }>()
);
