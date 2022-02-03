import { Wallet } from './../../shared/interfaces/Wallet';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
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
          .fetchWallets()
          .pipe(
            map((wallets: Wallet[]) =>
              WalletsActions.GetWalletsSuccess({ payload: wallets })
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
}
