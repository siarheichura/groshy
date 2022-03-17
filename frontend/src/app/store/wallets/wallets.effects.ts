import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';

import { WalletService } from './../../services/wallet.service';
import * as WalletsActions from './wallets.actions';
import { getMoneyMoveItemsByPeriod } from 'src/app/shared/helpers/money-move.helper';

@Injectable()
export class WalletsEffects {
  constructor(
    private walletService: WalletService,
    private actions$: Actions
  ) {}

  getWallets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetWallets),
      mergeMap(() =>
        this.walletService
          .getWallets()
          .pipe(
            map((data) =>
              WalletsActions.GetWalletsSuccess({ payload: data.data })
            )
          )
      )
    );
  });

  getWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetWallet),
      switchMap((action) =>
        this.walletService
          .getWallet(action.payload.id)
          .pipe(
            map((data) =>
              WalletsActions.GetWalletSuccess({ payload: data.data })
            )
          )
      )
    );
  });

  addWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.AddWallet),
      switchMap((action) =>
        this.walletService
          .addWallet(action.payload)
          .pipe(
            map((data) =>
              WalletsActions.AddWalletSuccess({ payload: data.data })
            )
          )
      )
    );
  });

  removeWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveWallet),
      switchMap((action) =>
        this.walletService.removeWallet(action.payload.id).pipe(
          map((data) =>
            WalletsActions.RemoveWalletSuccess({
              payload: { id: data.data },
            })
          )
        )
      )
    );
  });

  editWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.EditWallet),
      switchMap((action) =>
        this.walletService
          .editWallet(action.payload.id, action.payload.updatedWallet)
          .pipe(
            map(() =>
              WalletsActions.GetWallet({ payload: { id: action.payload.id } })
            )
          )
      )
    );
  });

  getWalletCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetWalletCategories),
      switchMap(({ payload }) =>
        this.walletService
          .getWalletCategories(payload.walletId)
          .pipe(
            map((data) =>
              WalletsActions.GetWalletCategoriesSuccess({ payload: data.data })
            )
          )
      )
    );
  });

  addCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.AddCategory),
      switchMap(({ payload }) =>
        this.walletService
          .addCategory(payload.walletId, payload.category)
          .pipe(
            map((data) =>
              WalletsActions.AddCategorySuccess({ payload: data.data })
            )
          )
      )
    );
  });

  removeCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveCategory),
      switchMap(({ payload }) =>
        this.walletService.removeCategory(payload.id).pipe(
          map((data) =>
            WalletsActions.RemoveCategorySuccess({
              payload: { id: data.data },
            })
          )
        )
      )
    );
  });

  getMoneyMoveByPeriod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetMoneyMoveByPeriod),
      switchMap(({ payload }) =>
        this.walletService
          .getMoneyMoveByPeriod(
            payload.walletId,
            payload.type,
            payload.startDate,
            payload.finishDate
          )
          .pipe(
            map((data) =>
              WalletsActions.GetMoneyMoveByPeriodSuccess({
                payload: getMoneyMoveItemsByPeriod(
                  data.data,
                  payload.startDate,
                  payload.finishDate
                ),
              })
            )
          )
      )
    );
  });

  addMoneyMoveItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.AddMoneyMoveItem),
      switchMap(({ payload }) =>
        this.walletService
          .addMoneyMoveItem(payload.type, payload.walletId, payload.item)
          .pipe(
            mergeMap((data) => [
              WalletsActions.AddMoneyMoveItemSuccess({ payload: data.data }),
              WalletsActions.GetWallet({ payload: { id: payload.walletId } }),
            ])
          )
      )
    );
  });

  removeMoneyMoveItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveMoneyMoveItem),
      switchMap(({ payload }) =>
        this.walletService
          .removeMoneyMoveItem(payload.type, payload.itemId)
          .pipe(
            mergeMap((data) => [
              WalletsActions.RemoveMoneyMoveItemSuccess({ payload: data.data }),
              WalletsActions.GetWallet({ payload: { id: payload.walletId } }),
            ])
          )
      )
    );
  });

  editMoneyMoveItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.EditMoneyMoveItem),
      switchMap(({ payload }) =>
        this.walletService
          .editMoneyMoveItem(payload.type, payload.itemId, payload.updatedItem)
          .pipe(
            mergeMap(() => [
              WalletsActions.GetMoneyMoveByPeriod({
                payload: {
                  walletId: payload.walletId,
                  type: payload.type,
                  startDate: payload.startDate,
                  finishDate: payload.finishDate,
                },
              }),
              WalletsActions.GetWallet({ payload: { id: payload.walletId } }),
            ])
          )
      )
    );
  });

  getMoneyMoveStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetMoneyMoveStatistics),
      switchMap(({ payload }) =>
        this.walletService
          .getMoneyMoveStatistic(
            payload.walletId,
            payload.type,
            payload.startDate,
            payload.finishDate
          )
          .pipe(
            map((data) =>
              WalletsActions.GetMoneyMoveStatisticsSuccess({
                payload: data.data,
              })
            )
          )
      )
    );
  });
}
