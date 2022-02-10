import express from 'express';
import { IncomeController } from '../controllers/income.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const incomeRouter = express.Router();
const controller = new IncomeController();

incomeRouter.get(
  `${RouterEnum.InitialIncome}/:id`,
  controller.getIncomeForInitialDisplay
);
incomeRouter.post(`${RouterEnum.Income}/:id`, controller.addWalletIncome);
