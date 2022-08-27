import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CategoriesState } from './categories.state'
import { OPERATION_TYPES } from '@shared/enums/OperationTypes.enum'

export const featureSelector = createFeatureSelector<CategoriesState>('categories')

export const categoriesSelector = createSelector(featureSelector, state => state.categories)
export const expenseCategoriesSelector = createSelector(
  featureSelector, state => state.categories.filter(category => category.type === OPERATION_TYPES.EXPENSE),
)
export const incomeCategoriesSelector = createSelector(
  featureSelector, state => state.categories.filter(category => category.type === OPERATION_TYPES.INCOME),
)


