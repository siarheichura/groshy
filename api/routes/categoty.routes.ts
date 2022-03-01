import express from 'express';
import { CategoryController } from './../controllers/category.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const categoryRouter = express.Router();
const controller = new CategoryController();

categoryRouter.get(
  `${RouterEnum.Categories}/:walletId/:type`,
  controller.getWalletCategories
);
categoryRouter.post(RouterEnum.Categories, controller.addCategory);
