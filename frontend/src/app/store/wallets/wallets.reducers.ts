import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import {
  GetWallets,
  GetWalletsSuccess,
  GetWalletSuccess,
  GetExpensesByDaySuccess,
  GetIncomeByDaySuccess,
  AddExpense,
  AddIncome,
} from './wallets.actions';

export const walletsReducer = createReducer(
  initialWalletsState,
  on(GetWallets, (state) => ({
    ...state,
    loading: true,
  })),
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
    loading: false,
  })),
  on(GetWalletSuccess, (state, { payload }) => ({
    ...state,
    wallet: payload,
    loading: false,
    walletCurrency: payload.currency,
  })),
  on(GetExpensesByDaySuccess, (state, { payload }) => ({
    ...state,
    expensesByDay: payload,
  })),
  on(GetIncomeByDaySuccess, (state, { payload }) => ({
    ...state,
    incomeByDay: payload,
  })),
  on(AddExpense, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount - payload.expense.amount,
    },
  })),
  on(AddIncome, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount + payload.income.amount,
    },
  }))
);
