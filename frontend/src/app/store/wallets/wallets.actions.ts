import { createAction, props } from '@ngrx/store';
import { Wallet } from './../../shared/interfaces/Wallet';
import { Income, InitWalletIncome } from './../../shared/interfaces/Income';
import { Expense, InitWalletExpenses } from 'src/app/shared/interfaces/Expense';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';

const MODULE_NAME = '[WALLETS]';
const getFullActionName = getActionNameFn(MODULE_NAME);

enum WalletsActionsEnum {
  GetWallets = 'GET_WALLETS',
  GetWalletsSuccess = 'GET_WALLETS_SUCCESS',
  GetWallet = 'GET_WALLET',
  GetWalletSuccess = 'GET_WALLET_SUCCESS',
  AddWallet = 'ADD_WALLET',
  RemoveWallet = 'REMOVE_WALLET',
  EditWallet = 'EDIT_WALLET',
  GetInitWalletExpenses = 'GET_INIT_WALLET_EXPENSES',
  GetInitWalletExpensesSuccess = 'GET_INIT_WALLET_EXPENSES_SUCCESS',
  GetInitWalletIncome = 'GET_INIT_WALLET_INCOME',
  GetInitWalletIncomeSuccess = 'GET_INIT_WALLET_INCOME_SUCCESS',
  AddExpense = 'ADD_EXPENSE',
  AddIncome = 'ADD_INCOME',
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
export const RemoveWallet = createAction(
  getFullActionName(WalletsActionsEnum.RemoveWallet),
  props<{ payload: { id: string } }>()
);
export const EditWallet = createAction(
  getFullActionName(WalletsActionsEnum.EditWallet),
  props<{ payload: { id: string; updatedWallet: Wallet } }>()
);

export const GetInitWalletExpenses = createAction(
  getFullActionName(WalletsActionsEnum.GetInitWalletExpenses),
  props<{ payload: { walletId: string } }>()
);
export const GetInitWalletExpensesSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetInitWalletExpensesSuccess),
  props<{ payload: InitWalletExpenses }>()
);
export const GetInitWalletIncome = createAction(
  getFullActionName(WalletsActionsEnum.GetInitWalletIncome),
  props<{ payload: { walletId: string } }>()
);
export const GetInitWalletIncomeSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetInitWalletIncomeSuccess),
  props<{ payload: InitWalletIncome }>()
);
export const AddExpense = createAction(
  getFullActionName(WalletsActionsEnum.AddExpense),
  props<{ payload: { expense: Expense; walletId: string } }>()
);
export const AddIncome = createAction(
  getFullActionName(WalletsActionsEnum.AddIncome),
  props<{ payload: { income: Income; walletId: string } }>()
);
