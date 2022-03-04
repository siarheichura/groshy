import express from 'express';
import { ExpensesController } from './../controllers/expenses.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const expensesRouter = express.Router();
const controller = new ExpensesController();

expensesRouter.get(
  `${RouterEnum.Expense}/:walletId/:startDate/:finishDate?`,
  controller.getExpensesByPeriod
);
expensesRouter.get(`${RouterEnum.Expense}/:id`, controller.getExpense);
expensesRouter.post(`${RouterEnum.Expense}/:id`, controller.addExpense);
expensesRouter.delete(
  `${RouterEnum.Expense}/:expenseId`,
  controller.removeExpense
);
expensesRouter.put(`${RouterEnum.Expense}/:expenseId`, controller.editExpense);
