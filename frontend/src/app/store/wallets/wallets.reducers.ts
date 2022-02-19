import { createReducer, on } from '@ngrx/store';
import { DayMoneyMove, initialWalletsState } from './wallets.state';
import {
  GetWallets,
  GetWalletsSuccess,
  GetWalletSuccess,
  AddIncome,
  GetMoneyMoveByPeriodTemplate,
  GetExpensesByPeriodSuccess,
  GetIncomeByPeriodSuccess,
  AddExpense,
  RemoveExpense,
} from './wallets.actions';
import dayjs, { Dayjs } from 'dayjs';

const getMoneyMoveTemplateByPeriod = (
  startDate: Dayjs,
  finishDate: Dayjs = startDate
) => {
  const result: DayMoneyMove[] = [];
  const daysDiff = finishDate.diff(startDate, 'day');

  for (let i = daysDiff; i >= 0; i--) {
    result.push({
      date: startDate.add(i, 'day'),
      expenses: [],
      income: [],
      expensesSum: 0,
      incomeSum: 0,
    });
  }
  return result;
};

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
  on(GetMoneyMoveByPeriodTemplate, (state, { payload }) => ({
    ...state,
    moneyMoveByPeriod: getMoneyMoveTemplateByPeriod(
      payload.startDate,
      payload.finishDate
    ),
  })),
  on(GetExpensesByPeriodSuccess, (state, { payload }) => ({
    ...state,
    moneyMoveByPeriod: state.moneyMoveByPeriod.map((day) => {
      return {
        ...day,
        expenses: payload.filter((expense) =>
          dayjs(expense.date).isSame(day.date, 'day')
        ),
        expensesSum: payload
          .filter((expense) => dayjs(expense.date).isSame(day.date, 'day'))
          .reduce((prev, curr) => prev + curr.amount, 0),
      };
    }),
  })),
  on(GetIncomeByPeriodSuccess, (state, { payload }) => ({
    ...state,
    moneyMoveByPeriod: state.moneyMoveByPeriod.map((day) => {
      return {
        ...day,
        income: payload.filter((income) =>
          dayjs(income.date).isSame(day.date, 'day')
        ),
        incomeSum: payload
          .filter((income) => dayjs(income.date).isSame(day.date, 'day'))
          .reduce((prev, curr) => prev + curr.amount, 0),
      };
    }),
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
