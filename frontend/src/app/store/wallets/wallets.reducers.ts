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
  GetExpensesByMonthSuccess,
  GetIncomeByMonthSuccess,
  RemoveExpenseSuccess,
  GetMonthDays,
} from './wallets.actions';
import dayjs from 'dayjs';

const getMonthMoneyMoveTemplate = (date: Date) => {
  const result = [];

  // check 'i' is not bigger than number of days in a month
  // & not bigger than current day
  for (
    let i = 1;
    i <= dayjs(date).daysInMonth() && dayjs(date).date(i).isBefore(dayjs());
    i++
  ) {
    result.unshift({
      date: dayjs(date).date(i),
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
  on(GetExpensesByDaySuccess, (state, { payload }) => ({
    ...state,
    expensesByDay: payload,
  })),
  on(GetIncomeByDaySuccess, (state, { payload }) => ({
    ...state,
    incomeByDay: payload,
  })),
  on(GetMonthDays, (state, { payload }) => ({
    ...state,
    monthMoneyMove: getMonthMoneyMoveTemplate(payload),
  })),
  on(GetExpensesByMonthSuccess, (state, { payload }) => ({
    ...state,
    monthMoneyMove: state.monthMoneyMove.map((day) => {
      return {
        ...day,
        expenses: payload.filter((expense) =>
          dayjs(expense.date).isSame(day.date, 'day')
        ),
        expensesSum: payload
          .filter((expense) => dayjs(expense.date).isSame(day.date, 'day'))
          .reduce((prev, curr) => prev + curr.amount, 0),
        // expensesSum: day.expenses.reduce((prev, curr) => prev + curr.amount, 0),  --- doesn't work :(
      };
    }),
  })),
  on(GetIncomeByMonthSuccess, (state, { payload }) => ({
    ...state,
    monthMoneyMove: state.monthMoneyMove.map((day) => {
      return {
        ...day,
        income: payload.filter((income) =>
          dayjs(income.date).isSame(day.date, 'day')
        ),
        incomeSum: payload
          .filter((income) => dayjs(income.date).isSame(day.date, 'day'))
          .reduce((prev, curr) => prev + curr.amount, 0),
        // incomeSum: day.income.reduce((prev, curr) => prev + curr.amount, 0),  --- doesn't work :(
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
  on(RemoveExpenseSuccess, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount + payload.amount,
    },
    expensesByDay: state.expensesByDay.filter(
      (expense) => expense._id !== payload._id
    ),
  })),
  on(AddIncome, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount + payload.income.amount,
    },
  }))
);
