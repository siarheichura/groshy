import express from 'express';
import { ExpensesController } from './../controllers/expenses.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const expensesRouter = express.Router();
const controller = new ExpensesController();

expensesRouter.get(
  `${RouterEnum.Expenses}/:walletId/:startDate/:finishDate?`,
  controller.getExpensesByPeriod
);
expensesRouter.get(`${RouterEnum.Expenses}/:id`, controller.getExpense);
expensesRouter.post(`${RouterEnum.Expenses}/:id`, controller.addExpense);
expensesRouter.delete(
  `${RouterEnum.Expenses}/:expenseId`,
  controller.removeExpense
);
expensesRouter.put(`${RouterEnum.Expenses}/:expenseId`, controller.editExpense);
