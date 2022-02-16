import express from 'express';
import { ExpensesController } from './../controllers/expenses.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const expensesRouter = express.Router();
const controller = new ExpensesController();

expensesRouter.get(
  `${RouterEnum.Expenses}${RouterEnum.ByDay}/:id/:date`,
  controller.getExpensesByDay
);
expensesRouter.get(
  `${RouterEnum.Expenses}${RouterEnum.ByMonth}/:id/:date`,
  controller.getExpensesByMonth
);
expensesRouter.post(`${RouterEnum.Expenses}/:id`, controller.addExpense);
expensesRouter.delete(
  `${RouterEnum.Expenses}/:walletId/:expenseId`,
  controller.removeExpense
);
expensesRouter.put(
  `${RouterEnum.Expenses}/:walletId/:expenseId`,
  controller.editExpense
);
