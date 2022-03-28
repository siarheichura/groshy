import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as SharedActions from './shared.actions';
import * as WalletsActions from '../wallets/wallets.actions';
import * as UserActions from '../user/user.actions';

@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions, private nzMessage: NzMessageService) {}

  loadingStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserActions.Registration,
        UserActions.Login,
        UserActions.UpdateUserInfo,
        UserActions.ChangePassword,
        WalletsActions.GetWallets,
        WalletsActions.GetWallet,
        WalletsActions.AddWallet,
        WalletsActions.EditWallet,
        WalletsActions.RemoveWallet,
        WalletsActions.GetMoneyMoveByPeriod,
        WalletsActions.AddMoneyMoveItem,
        WalletsActions.RemoveMoneyMoveItem,
        WalletsActions.EditMoneyMoveItem,
        WalletsActions.GetMoneyMoveStatistics
      ),
      map(() => SharedActions.Loading({ payload: true }))
    );
  });

  loadingStop$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserActions.RegistrationSuccess,
        UserActions.LoginSuccess,
        UserActions.ChangePasswordSuccess,
        UserActions.ChangePasswordError,
        UserActions.UpdateUserInfoSuccess,
        WalletsActions.GetWalletSuccess,
        WalletsActions.GetWalletsSuccess,
        WalletsActions.AddWalletSuccess,
        WalletsActions.GetMoneyMoveByPeriodSuccess,
        WalletsActions.AddMoneyMoveItemSuccess,
        WalletsActions.AddMoneyMoveItemSuccess,
        WalletsActions.GetMoneyMoveStatisticsSuccess
      ),
      map(() => SharedActions.Loading({ payload: false }))
    );
  });

  printNzMessageSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SharedActions.PrintNzMessageSuccess),
        map((action) => {
          return this.nzMessage.success(action.payload);
        })
      );
    },
    { dispatch: false }
  );

  printNzMessageError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SharedActions.PrintNzMessageError),
        map((action) => this.nzMessage.error(action.payload))
      );
    },
    { dispatch: false }
  );
}
