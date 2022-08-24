import { createFeatureSelector, createSelector } from '@ngrx/store'
import { OperationsState } from './operations.state'

export const featureSelector = createFeatureSelector<OperationsState>('operations')

export const operationsSelector = createSelector( featureSelector, state => state.operations)
export const operationsTypeSelector = createSelector( featureSelector, state => state.type)
export const operationsPeriodSelector = createSelector( featureSelector, state => state.period)
export const operationsStatisticsSelector = createSelector( featureSelector, state => state.statistics)

