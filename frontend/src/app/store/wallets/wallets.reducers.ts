import { createReducer, on } from '@ngrx/store';
import { initialWalletsState } from './wallets.state';
import {
  GetWalletsSuccess,
  GetWalletSuccess,
  AddIncome,
  GetMoneyMoveByPeriodTemplate,
  GetExpensesByPeriodSuccess,
  GetIncomeByPeriodSuccess,
  AddExpense,
  AddWalletSuccess,
  RemoveWalletSuccess,
  AddExpenseSuccess,
  RemoveExpenseSuccess,
  AddIncomeSuccess,
  RemoveIncomeSuccess,
} from './wallets.actions';
import dayjs, { Dayjs } from 'dayjs';
import { DayMoneyMove } from 'src/app/shared/interfaces/DayMoneyMove';

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
  on(GetWalletsSuccess, (state, { payload }) => ({
    ...state,
    wallets: payload,
  })),
  on(GetWalletSuccess, (state, { payload }) => ({
    ...state,
    wallet: payload,
    walletCurrency: payload.currency,
  })),
  on(AddWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: [...state.wallets, payload],
  })),
  on(RemoveWalletSuccess, (state, { payload }) => ({
    ...state,
    wallets: state.wallets.filter((wallet) => wallet._id !== payload.id),
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
  on(AddExpenseSuccess, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount - payload.amount,
    },
    moneyMoveByPeriod: state.moneyMoveByPeriod.map((day) => {
      if (day.date.isSame(payload.date, 'day')) {
        return {
          ...day,
          expenses: [...day.expenses, payload],
          expensesSum: day.expensesSum + payload.amount,
        };
      }
      return day;
    }),
  })),
  on(RemoveExpenseSuccess, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount + payload.amount,
    },
    moneyMoveByPeriod: state.moneyMoveByPeriod.map((day) => {
      if (day.date.isSame(payload.date, 'day')) {
        return {
          ...day,
          expenses: day.expenses.filter(
            (expense) => expense._id !== payload._id
          ),
          expensesSum: day.expensesSum - payload.amount,
        };
      }
      return day;
    }),
  })),
  on(AddIncomeSuccess, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount + payload.amount,
    },
    moneyMoveByPeriod: state.moneyMoveByPeriod.map((day) => {
      if (day.date.isSame(payload.date, 'day')) {
        return {
          ...day,
          income: [...day.income, payload],
          incomeSum: day.incomeSum + payload.amount,
        };
      }
      return day;
    }),
  })),
  on(RemoveIncomeSuccess, (state, { payload }) => ({
    ...state,
    wallet: {
      ...state.wallet,
      amount: state.wallet.amount - payload.amount,
    },
    moneyMoveByPeriod: state.moneyMoveByPeriod.map((day) => {
      if (day.date.isSame(payload.date, 'day')) {
        return {
          ...day,
          income: day.income.filter((income) => income._id !== payload._id),
          incomeSum: day.incomeSum - payload.amount,
        };
      }
      return day;
    }),
  }))
);
