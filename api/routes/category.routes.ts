import express from 'express';
import { CategoryController } from './../controllers/category.controller';
import { ROUTER_ENUM } from '../shared/enums/Router.enum';

export const categoryRouter = express.Router()
const controller = new CategoryController()

categoryRouter.get(`${ROUTER_ENUM.BASIC_CATEGORIES}${ROUTER_ENUM.TYPE}`, controller.getBasicCategories)
categoryRouter.get(`${ROUTER_ENUM.CATEGORIES}${ROUTER_ENUM.TYPE}`, controller.getUserCategories) // type = expense/income/all
categoryRouter.post(`${ROUTER_ENUM.CATEGORIES}`, controller.addCategory)
categoryRouter.put(`${ROUTER_ENUM.CATEGORIES}${ROUTER_ENUM.CATEGORY_ID}`, controller.editCategory)
categoryRouter.delete(`${ROUTER_ENUM.CATEGORIES}${ROUTER_ENUM.CATEGORY_ID}`, controller.deleteCategory)
