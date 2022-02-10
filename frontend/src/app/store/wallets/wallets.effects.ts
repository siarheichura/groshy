import { Wallet } from './../../shared/interfaces/Wallet';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import { WalletService } from './../../services/wallet.service';
import * as WalletsActions from './wallets.actions';

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

  getInitExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetInitWalletExpenses),
      switchMap((action) =>
        this.walletService
          .getInitialWalletExpenses(action.payload.walletId)
          .pipe(
            map((initExpenses) =>
              WalletsActions.GetInitWalletExpensesSuccess({
                payload: initExpenses,
              })
            )
          )
      )
    );
  });

  getInitIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetInitWalletIncome),
      switchMap((action) =>
        this.walletService.getInitialWalletIncome(action.payload.walletId).pipe(
          map((initIncome) =>
            WalletsActions.GetInitWalletIncomeSuccess({
              payload: initIncome,
            })
          )
        )
      )
    );
  });

  addExpense$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WalletsActions.AddExpense),
        switchMap((action) =>
          this.walletService.addExpense(
            action.payload.walletId,
            action.payload.expense
          )
        )
      );
    },
    { dispatch: false }
  );

  addIncome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(WalletsActions.AddIncome),
        switchMap((action) =>
          this.walletService.addIncome(
            action.payload.walletId,
            action.payload.income
          )
        )
      );
    },
    { dispatch: false }
  );
}
