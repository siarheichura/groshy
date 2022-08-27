import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { ofType, Actions, createEffect } from '@ngrx/effects'
import { map, mergeMap, switchMap, catchError, of } from 'rxjs'

import { WalletService } from '@services/wallet.service'
import * as WalletsActions from './wallets.actions'
import * as SharedActions from '@store/shared/shared.actions'
import { UserService } from '@services/user.service'

@Injectable()
export class WalletsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private walletService: WalletService,
    private userService: UserService,
  ) {
  }

  getWallets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetWallets),
      switchMap(() => {
        return this.walletService.getWallets(this.userService.userId).pipe(
          map(data => WalletsActions.GetWalletsSuccess({ payload: { wallet: data.data } })),
          catchError(err => of(SharedActions.PrintNzMessageError({ payload: err.error.message }))),
        )
      }),
    )
  })

  addWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.AddWallet),
      switchMap(({ payload }) =>
        this.walletService.addWallet(payload.userId, payload.wallet).pipe(
          map(() => WalletsActions.GetWallets()),
          catchError(err => [SharedActions.PrintNzMessageError({ payload: err.error.message })]),
        ),
      ),
    )
  })

  removeWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.RemoveWallet),
      switchMap(action =>
        this.walletService.removeWallet(action.payload.id).pipe(
          mergeMap(data => {
              return [
                WalletsActions.GetWallets(),
                SharedActions.PrintNzMessageSuccess({ payload: 'Wallet and it operations were deleted' }),
              ]
            },
          ),
        ),
      ),
    )
  })

  editWallet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.EditWallet),
      switchMap(action =>
        this.walletService
          .editWallet(action.payload.id, action.payload.updatedWallet)
          .pipe(mergeMap((data) => {
            return [
              WalletsActions.GetWallets(),
              SharedActions.PrintNzMessageSuccess({ payload: 'Wallet was edited' }),
            ]
          })),
      ),
    )
  })
}
