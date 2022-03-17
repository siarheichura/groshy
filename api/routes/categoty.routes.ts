import express from 'express';
import { CategoryController } from './../controllers/category.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const categoryRouter = express.Router();
const controller = new CategoryController();

categoryRouter.get(
  `${RouterEnum.Categories}/:walletId`,
  controller.getWalletCategories
);
categoryRouter.post(
  `${RouterEnum.Categories}/:walletId`,
  controller.addCategory
);
categoryRouter.delete(
  `${RouterEnum.Categories}/:id`,
  controller.removeCategory
);
