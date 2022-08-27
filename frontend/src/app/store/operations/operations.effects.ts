import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core'
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs'

import * as OperationsActions from './operations.actions'
import * as WalletActions from '../wallets/wallets.actions'
import { OperationsService } from '@services/operations.service'
import { operationsPeriodSelector, operationsTypeSelector } from '@store/operations/operations.selectors'
import { Store } from '@ngrx/store'

@Injectable()
export class OperationsEffects {
  period$ = this.store.select(operationsPeriodSelector)
  type$ = this.store.select(operationsTypeSelector)

  constructor(
    private actions$: Actions,
    private store: Store,
    private operationsService: OperationsService,
  ) {
  }

  getOperations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OperationsActions.GetOperations),
      withLatestFrom(this.type$, this.period$),
      switchMap(([payload, type, period]) =>
        this.operationsService.getOperations(type, period.startDate, period.finishDate).pipe(
          map(data => OperationsActions.GetOperationsSuccess({ payload: data.data })),
        ),
      ),
    )
  })

  addOperation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OperationsActions.AddOperation),
      switchMap(({ payload }) => this.operationsService.addOperation(payload).pipe(
        mergeMap(() => [OperationsActions.GetOperations(), WalletActions.GetWallets()]),
      )),
    )
  })

  editOperation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OperationsActions.EditOperation),
      switchMap(({ payload }) => this.operationsService.editOperation(payload.id, payload.operation).pipe(
        mergeMap(() => [OperationsActions.GetOperations(), WalletActions.GetWallets()]),
      )),
    )
  })

  deleteOperation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OperationsActions.DeleteOperation),
      switchMap(({ payload }) => this.operationsService.deleteOperation(payload.id).pipe(
        mergeMap(() => [OperationsActions.GetOperations(), WalletActions.GetWallets()]),
      )),
    )
  })

  getOperationsStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OperationsActions.GetOperationsStatistics),
      withLatestFrom(this.type$, this.period$),
      switchMap(([payload, type, period]) =>
        this.operationsService.getOperationsStatistics(type, period.startDate, period.finishDate).pipe(
          map(data => OperationsActions.GetOperationsStatisticsSuccess({ payload: data.data })),
        ),
      ),
    )
  })
}

