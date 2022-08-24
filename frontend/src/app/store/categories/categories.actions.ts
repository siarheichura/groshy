import { createAction, props } from '@ngrx/store';

import { getActionNameFn } from "@shared/helpers/action-name.helper";
import { Category } from "@shared/interfaces/Category.interface";

const MODULE_NAME = '[CATEGORIES]';
const getFullActionName = getActionNameFn(MODULE_NAME);

enum CategoriesActionsEnum {
  ResetCategoriesState = 'RESET_CATEGORIES_STATE',
  GetUserCategories = 'GET_USER_CATEGORIES',
  GetUserCategoriesSuccess = 'GET_USER_CATEGORIES_SUCCESS',
  AddCategory = 'ADD_CATEGORY',
  EditCategory = 'EDIT_CATEGORY',
  DeleteCategory = 'DELETE_CATEGORY',
}

export const ResetCategoriesState = createAction(
  getFullActionName(CategoriesActionsEnum.ResetCategoriesState),
  props<{ payload: { type: string } }>()
)
export const GetUserCategories = createAction(
  getFullActionName(CategoriesActionsEnum.GetUserCategories),
  props<{ payload: { type: string } }>()      // expense/income/all
)
export const GetUserCategoriesSuccess = createAction(
  getFullActionName(CategoriesActionsEnum.GetUserCategoriesSuccess),
  props<{ payload: Category[] }>()
)
export const AddCategory = createAction(
  getFullActionName(CategoriesActionsEnum.AddCategory),
  props<{ payload: Category }>()
)
export const EditCategory = createAction(
  getFullActionName(CategoriesActionsEnum.EditCategory),
  props<{ payload: { categoryId: string, category: Category }  }>()
)
export const DeleteCategory = createAction(
  getFullActionName(CategoriesActionsEnum.DeleteCategory),
  props<{ payload: { categoryId: string } }>()
)

