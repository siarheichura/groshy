import { createReducer, on } from '@ngrx/store';
import { initialCategoriesState } from "@store/categories/categories.state";
import { GetUserCategoriesSuccess, ResetCategoriesState } from "@store/categories/categories.actions";

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(ResetCategoriesState, state => ({ ...state, operations: [] })),
  on(GetUserCategoriesSuccess, (state, { payload }) => ({ ...state, categories: payload })),
)
