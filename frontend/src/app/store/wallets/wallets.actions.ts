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

  GetMonthDays = 'GET_MONTH_DAYS',
  // Expenses
  GetExpensesByDay = 'GET_EXPENSES_BY_DAY',
  GetExpensesByDaySuccess = 'GET_EXPENSES_BY_DAY_SUCCESS',
  GetExpensesByMonth = 'GET_EXPENSES_BY_MONTH',
  GetExpensesByMonthSuccess = 'GET_EXPENSES_BY_MONTH_SUCCESS',
  AddExpense = 'ADD_EXPENSE',
  RemoveExpense = 'REMOVE_EXPENSE',
  RemoveExpenseSuccess = 'REMOVE_EXPENSE_SUCCESS',
  EditExpense = 'EDIT_EXPENSE',
  EditExpenseSuccess = 'EDIT_EXPENSE_SUCCESS',

  // Income
  GetIncomeByDay = 'GET_INCOME_BY_DAY',
  GetIncomeByDaySuccess = 'GET_INCOME_BY_DAY_SUCCESS',
  GetIncomeByMonth = 'GET_INCOME_BY_MONTH',
  GetIncomeByMonthSuccess = 'GET_INCOME_BY_MONTH_SUCCESS',
  AddIncome = 'ADD_INCOME',
  RemoveIncome = 'REMOVE_INCOME',
  RemoveIncomeSuccess = 'REMOVE_INCOME_SUCCESS',
  EditIncome = 'EDIT_INCOME',
  EditIncomeSuccess = 'EDIT_INCOME_SUCCESS',
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
export const GetMonthDays = createAction(
  getFullActionName(WalletsActionsEnum.GetMonthDays),
  props<{ payload: Date }>()
);
export const GetExpensesByMonth = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByMonth),
  props<{ payload: { walletId: string; date: Date } }>()
);
export const GetExpensesByMonthSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByMonthSuccess),
  props<{ payload: Expense[] }>()
);
export const GetIncomeByMonth = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByMonth),
  props<{ payload: { walletId: string; date: Date } }>()
);
export const GetIncomeByMonthSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByMonthSuccess),
  props<{ payload: Income[] }>()
);
export const AddExpense = createAction(
  getFullActionName(WalletsActionsEnum.AddExpense),
  props<{ payload: { expense: Expense; walletId: string } }>()
);
export const RemoveExpense = createAction(
  getFullActionName(WalletsActionsEnum.RemoveExpense),
  props<{ payload: { expenseId: string } }>()
);
export const RemoveExpenseSuccess = createAction(
  getFullActionName(WalletsActionsEnum.RemoveExpenseSuccess),
  props<{ payload: Expense }>()
);
export const EditExpense = createAction(
  getFullActionName(WalletsActionsEnum.EditExpense),
  props<{ payload: { expenseId: string; updatedExpense: Expense } }>()
);
export const EditExpenseSuccess = createAction(
  getFullActionName(WalletsActionsEnum.EditExpenseSuccess),
  props<{ payload: Expense }>()
);
export const AddIncome = createAction(
  getFullActionName(WalletsActionsEnum.AddIncome),
  props<{ payload: { income: Income; walletId: string } }>()
);
