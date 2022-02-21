import { Wallet } from './../../shared/interfaces/Wallet';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import { WalletService } from './../../services/wallet.service';
import * as WalletsActions from './wallets.actions';

@Injectable()
export class WalletsEffects {
  today: Date = new Date();
  yesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));

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
            map((wallets) =>
              WalletsActions.GetWalletsSuccess({ payload: wallets })
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
            map((wallet) =>
              WalletsActions.GetWalletSuccess({ payload: wallet })
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
            map((wallet) =>
              WalletsActions.AddWalletSuccess({ payload: wallet })
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

  getExpensesByPeriod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetExpensesByPeriod),
      switchMap(({ payload }) =>
        this.walletService
          .getExpensesByPeriod(
            payload.walletId,
            payload.startDate,
            payload.finishDate
          )
          .pipe(
            map((expense) =>
              WalletsActions.GetExpensesByPeriodSuccess({ payload: expense })
            )
          )
      )
    );
  });

  getIncomeByPeriod$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetIncomeByPeriod),
      switchMap(({ payload }) =>
        this.walletService
          .getIncomeByPeriod(
            payload.walletId,
            payload.startDate,
            payload.finishDate
          )
          .pipe(
            map((expense) =>
              WalletsActions.GetIncomeByPeriodSuccess({ payload: expense })
            )
          )
      )
    );
  });

  addExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.AddExpense),
      switchMap((action) =>
        this.walletService
          .addExpense(action.payload.walletId, action.payload.expense)
          .pipe(
            map((expense) =>
              WalletsActions.AddExpenseSuccess({ payload: expense })
            )
          )
      )
    );
  });

  addIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.AddIncome),
      switchMap((action) =>
        this.walletService
          .addIncome(action.payload.walletId, action.payload.income)
          .pipe(
            map((income) =>
              WalletsActions.AddIncomeSuccess({ payload: income })
            )
          )
      )
    );
  });

  removeExpense$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveExpense),
      switchMap((action) =>
        this.walletService
          .removeExpense(action.payload.expenseId)
          .pipe(
            map((expense) =>
              WalletsActions.RemoveExpenseSuccess({ payload: expense })
            )
          )
      )
    );
  });

  removeIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveIncome),
      switchMap((action) =>
        this.walletService
          .removeIncome(action.payload.incomeId)
          .pipe(
            map((income) =>
              WalletsActions.RemoveIncomeSuccess({ payload: income })
            )
          )
      )
    );
  });

  editExpense$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WalletsActions.EditExpense),
        switchMap((action) =>
          this.walletService.editExpense(
            action.payload.expenseId,
            action.payload.updatedExpense
          )
        )
      );
    },
    { dispatch: false }
  );
}
