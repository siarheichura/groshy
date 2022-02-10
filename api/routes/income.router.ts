import express from 'express';
import { IncomeController } from '../controllers/income.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const incomeRouter = express.Router();
const controller = new IncomeController();

incomeRouter.get(
  `${RouterEnum.Income}${RouterEnum.ByDay}/:id/:date`,
  controller.getIncomeByDay
);
incomeRouter.get(
  `${RouterEnum.Income}${RouterEnum.ByMonth}/:id/:date`,
  controller.getIncomeByMonth
);
incomeRouter.post(`${RouterEnum.Income}/:id`, controller.addIncome);
