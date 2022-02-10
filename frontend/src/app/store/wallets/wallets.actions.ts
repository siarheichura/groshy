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
  GetExpensesByPeriod = 'GET_EXPENSES_BY_PERIOD',
  GetExpensesByPeriodSuccess = 'GET_EXPENSES_BY_PERIOD_SUCCESS',
  GetIncomeByPeriod = 'GET_INCOME_BY_PERIOD',
  GetIncomeByPeriodSuccess = 'GET_INCOME_BY_PERIOD_SUCCESS',
  AddExpense = 'ADD_EXPENSE',
  AddExpenseSuccess = 'ADD_EXPENSE_SUCCESS',
  AddIncome = 'ADD_INCOME',
  AddIncomeSuccess = 'ADD_INCOME_SUCCESS',
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
export const GetExpensesByPeriod = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByPeriod),
  props<{ payload: { walletId: string; date: Date; period: string } }>()
);
export const GetExpensesByPeriodSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByPeriodSuccess),
  props<{ payload: Expense[] }>()
);
export const GetIncomeByPeriod = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByPeriod),
  props<{ payload: { walletId: string; date: Date; period: string } }>()
);
export const GetIncomeByPeriodSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByPeriodSuccess),
  props<{ payload: Income[] }>()
);
export const AddExpense = createAction(
  getFullActionName(WalletsActionsEnum.AddExpense),
  props<{ payload: { expense: Expense; walletId: string } }>()
);
export const AddExpenseSuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddExpenseSuccess),
  props<{ payload: Expense }>()
);
export const AddIncome = createAction(
  getFullActionName(WalletsActionsEnum.AddIncome),
  props<{ payload: { income: Income; walletId: string } }>()
);
export const AddIncomeSuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddIncomeSuccess),
  props<{ payload: Income }>()
);
