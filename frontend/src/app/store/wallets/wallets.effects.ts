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
            map((wallets: Wallet[]) =>
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
            map((wallet: Wallet) =>
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
          .pipe(map(() => WalletsActions.GetWallets()))
      )
    );
  });

  removeWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveWallet),
      switchMap((action) =>
        this.walletService
          .removeWallet(action.payload.id)
          .pipe(map(() => WalletsActions.GetWallets()))
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

  getExpensesByDay$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetExpensesByDay),
      switchMap((action) =>
        this.walletService
          .getExpensesByPeriod(
            action.payload.walletId,
            action.payload.date,
            'day'
          )
          .pipe(
            map((expense) =>
              WalletsActions.GetExpensesByDaySuccess({ payload: expense })
            )
          )
      )
    );
  });

  getIncomeByDay$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetIncomeByDay),
      switchMap((action) =>
        this.walletService
          .getIncomeByPeriod(
            action.payload.walletId,
            action.payload.date,
            'day'
          )
          .pipe(
            map((income) =>
              WalletsActions.GetIncomeByDaySuccess({ payload: income })
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
            map(() =>
              WalletsActions.GetExpensesByDay({
                payload: {
                  walletId: action.payload.walletId,
                  date: new Date(),
                },
              })
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
            map(() =>
              WalletsActions.GetIncomeByDay({
                payload: {
                  walletId: action.payload.walletId,
                  date: new Date(),
                },
              })
            )
          )
      )
    );
  });
}
