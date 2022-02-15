import { createAction, props } from '@ngrx/store';
import { Wallet } from './../../shared/interfaces/Wallet';
import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';
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
  GetExpensesByDay = 'GET_EXPENSES_BY_PERIOD',
  GetExpensesByDaySuccess = 'GET_EXPENSES_BY_PERIOD_SUCCESS',
  GetIncomeByDay = 'GET_INCOME_BY_PERIOD',
  GetIncomeByDaySuccess = 'GET_INCOME_BY_PERIOD_SUCCESS',
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
export const GetExpensesByDay = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByDay),
  props<{ payload: { walletId: string; date: Date } }>()
);
export const GetExpensesByDaySuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByDaySuccess),
  props<{ payload: Expense[] }>()
);
export const GetIncomeByDay = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByDay),
  props<{ payload: { walletId: string; date: Date } }>()
);
export const GetIncomeByDaySuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByDaySuccess),
  props<{ payload: Income[] }>()
);
export const AddExpense = createAction(
  getFullActionName(WalletsActionsEnum.AddExpense),
  props<{ payload: { expense: Expense; walletId: string } }>()
);
export const AddIncome = createAction(
  getFullActionName(WalletsActionsEnum.AddIncome),
  props<{ payload: { income: Income; walletId: string } }>()
);
