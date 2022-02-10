import express from 'express';
import { ExpensesController } from './../controllers/expenses.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const expensesRouter = express.Router();
const controller = new ExpensesController();

expensesRouter.get(
  `${RouterEnum.InitialExpenses}/:id`,
  controller.getExpensesForInitialDisplay
);
expensesRouter.post(`${RouterEnum.Expenses}/:id`, controller.addExpense);
