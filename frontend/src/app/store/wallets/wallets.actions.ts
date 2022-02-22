import { createAction, props } from '@ngrx/store';
import { Wallet } from './../../shared/interfaces/Wallet';
import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';
import { getActionNameFn } from 'src/app/shared/helpers/action-name.helper';
import { Dayjs } from 'dayjs';

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

  GetMoneyMoveByPeriodTemplate = 'GET_MONEY_MOVE_BY_PERIOD_TEMPLATE',

  // Expenses
  GetExpensesByPeriod = 'GET_EXPENSES_BY_PERIOD',
  GetExpensesByPeriodSuccess = 'GET_EXPENSES_BY_PERIOD_SUCCESS',
  AddExpense = 'ADD_EXPENSE',
  AddExpenseSuccess = 'ADD_EXPENSE_SUCCESS',
  RemoveExpense = 'REMOVE_EXPENSE',
  RemoveExpenseSuccess = 'REMOVE_EXPENSE_SUCCESS',
  EditExpense = 'EDIT_EXPENSE',
  EditExpenseSuccess = 'EDIT_EXPENSE_SUCCESS',

  // Income
  GetIncomeByPeriod = 'GET_INCOME_BY_PERIOD',
  GetIncomeByPeriodSuccess = 'GET_INCOME_BY_PERIOD_SUCCESS',
  AddIncome = 'ADD_INCOME',
  AddIncomeSuccess = 'ADD_INCOME_SUCCESS',
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

export const GetMoneyMoveByPeriodTemplate = createAction(
  getFullActionName(WalletsActionsEnum.GetMoneyMoveByPeriodTemplate),
  props<{ payload: { startDate: Dayjs; finishDate?: Dayjs } }>()
);

export const GetExpensesByPeriod = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByPeriod),
  props<{
    payload: { walletId: string; startDate: Dayjs; finishDate?: Dayjs };
  }>()
);
export const GetExpensesByPeriodSuccess = createAction(
  getFullActionName(WalletsActionsEnum.GetExpensesByPeriodSuccess),
  props<{ payload: Expense[] }>()
);
export const GetIncomeByPeriod = createAction(
  getFullActionName(WalletsActionsEnum.GetIncomeByPeriod),
  props<{
    payload: { walletId: string; startDate: Dayjs; finishDate?: Dayjs };
  }>()
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
  props<{ payload: { expense: Expense; updatedExpense: Expense } }>()
);
export const EditExpenseSuccess = createAction(
  getFullActionName(WalletsActionsEnum.EditExpenseSuccess),
  props<{ payload: { expense: Expense; updatedExpense: Expense } }>()
);
export const AddIncome = createAction(
  getFullActionName(WalletsActionsEnum.AddIncome),
  props<{ payload: { income: Income; walletId: string } }>()
);
export const AddIncomeSuccess = createAction(
  getFullActionName(WalletsActionsEnum.AddIncomeSuccess),
  props<{ payload: Income }>()
);
export const RemoveIncome = createAction(
  getFullActionName(WalletsActionsEnum.RemoveIncome),
  props<{ payload: { incomeId: string } }>()
);
export const RemoveIncomeSuccess = createAction(
  getFullActionName(WalletsActionsEnum.RemoveIncomeSuccess),
  props<{ payload: Income }>()
);
export const EditIncome = createAction(
  getFullActionName(WalletsActionsEnum.EditIncome),
  props<{ payload: { income: Income; updatedIncome: Income } }>()
);
export const EditIncomeSuccess = createAction(
  getFullActionName(WalletsActionsEnum.EditIncomeSuccess),
  props<{ payload: { income: Income; updatedIncome: Income } }>()
);
