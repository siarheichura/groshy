import express from 'express';
import { IncomeController } from '../controllers/income.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const incomeRouter = express.Router();
const controller = new IncomeController();

incomeRouter.post(`${RouterEnum.Income}/:id`, controller.addIncome);
incomeRouter.delete(`${RouterEnum.Income}/:incomeId`, controller.removeIncome);
incomeRouter.put(`${RouterEnum.Income}/:incomeId`, controller.editIncome);

incomeRouter.get(
  `${RouterEnum.Income}/:walletId/:startDate/:finishDate?`,
  controller.getIncomeByPeriod
);
