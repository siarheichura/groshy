import { Dayjs } from 'dayjs';
import { Expense } from './Expense';
import { Income } from './Income';

export interface DayMoneyMove {
  date: Dayjs;
  expenses: Expense[];
  income: Income[];
  expensesSum: number;
  incomeSum: number;
}
