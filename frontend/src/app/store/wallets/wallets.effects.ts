import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect, act } from '@ngrx/effects';
import { map, mergeMap, switchMap, Observable, take } from 'rxjs';

import { WalletService } from './../../services/wallet.service';
import * as WalletsActions from './wallets.actions';

@Injectable()
export class WalletsEffects {
  constructor(
    private walletService: WalletService,
    private actions$: Actions,
    private store: Store
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
          map(() =>
            WalletsActions.RemoveWalletSuccess({
              payload: { id: action.payload.id },
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
          .pipe(map(() => WalletsActions.GetWallets()))
      )
    );
  });

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetCategories),
      switchMap(({ payload }) =>
        this.walletService
          .getCategories(payload.walletId, payload.type)
          .pipe(
            map((categories) =>
              WalletsActions.GetCategoriesSuccess({ payload: categories })
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
            map((moneyMoveItems) =>
              WalletsActions.GetMoneyMoveByPeriodSuccess({
                payload: moneyMoveItems.periodMoneyMove,
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
            mergeMap((items) => [
              WalletsActions.AddMoneyMoveItemSuccess({ payload: items }),
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
            mergeMap((item) => [
              WalletsActions.RemoveMoneyMoveItemSuccess({ payload: item }),
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
            mergeMap((item) => [
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

  // getExpensesByPeriod$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.GetExpensesByPeriod),
  //     switchMap(({ payload }) =>
  //       this.walletService
  //         .getExpensesByPeriod(
  //           payload.walletId,
  //           payload.startDate,
  //           payload.finishDate
  //         )
  //         .pipe(
  //           map((expense) =>
  //             WalletsActions.GetExpensesByPeriodSuccess({ payload: expense })
  //           )
  //         )
  //     )
  //   );
  // });

  // getIncomeByPeriod$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.GetIncomeByPeriod),
  //     switchMap(({ payload }) =>
  //       this.walletService
  //         .getIncomeByPeriod(
  //           payload.walletId,
  //           payload.startDate,
  //           payload.finishDate
  //         )
  //         .pipe(
  //           map((expense) =>
  //             WalletsActions.GetIncomeByPeriodSuccess({ payload: expense })
  //           )
  //         )
  //     )
  //   );
  // });

  // addExpense$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.AddExpense),
  //     switchMap((action) =>
  //       this.walletService
  //         .addExpense(action.payload.walletId, action.payload.expense)
  //         .pipe(
  //           map((expense) =>
  //             WalletsActions.AddExpenseSuccess({ payload: expense })
  //           )
  //         )
  //     )
  //   );
  // });

  // addIncome$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.AddIncome),
  //     switchMap((action) =>
  //       this.walletService
  //         .addIncome(action.payload.walletId, action.payload.income)
  //         .pipe(
  //           map((income) =>
  //             WalletsActions.AddIncomeSuccess({ payload: income })
  //           )
  //         )
  //     )
  //   );
  // });

  // removeExpense$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.RemoveExpense),
  //     switchMap((action) =>
  //       this.walletService
  //         .removeExpense(action.payload.expenseId)
  //         .pipe(
  //           map((expense) =>
  //             WalletsActions.RemoveExpenseSuccess({ payload: expense })
  //           )
  //         )
  //     )
  //   );
  // });

  // removeIncome$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.RemoveIncome),
  //     switchMap((action) =>
  //       this.walletService
  //         .removeIncome(action.payload.incomeId)
  //         .pipe(
  //           map((income) =>
  //             WalletsActions.RemoveIncomeSuccess({ payload: income })
  //           )
  //         )
  //     )
  //   );
  // });

  // editExpense$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.EditExpense),
  //     switchMap((action) =>
  //       this.walletService
  //         .editExpense(
  //           action.payload.expense._id,
  //           action.payload.updatedExpense
  //         )
  //         .pipe(
  //           map((expense) =>
  //             WalletsActions.EditExpenseSuccess({
  //               payload: {
  //                 expense: action.payload.expense,
  //                 updatedExpense: expense,
  //               },
  //             })
  //           )
  //         )
  //     )
  //   );
  // });

  // editIncome$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(WalletsActions.EditIncome),
  //     switchMap((action) =>
  //       this.walletService
  //         .editIncome(action.payload.income._id, action.payload.updatedIncome)
  //         .pipe(
  //           map((income) =>
  //             WalletsActions.EditIncomeSuccess({
  //               payload: {
  //                 income: action.payload.income,
  //                 updatedIncome: income,
  //               },
  //             })
  //           )
  //         )
  //     )
  //   );
  // });
}
