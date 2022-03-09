import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, catchError, of } from 'rxjs';
import { ofType, Actions, createEffect } from '@ngrx/effects';

import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { NzMessage } from 'src/app/shared/enums/NzMessages.enum';
import { AuthService } from './../../services/auth.service';
import * as UserActions from './user.actions';
import * as SharedActions from '../shared/shared.actions';

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  registration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Registration),
      switchMap((action) =>
        this.authService.registration(action.payload).pipe(
          switchMap(() => {
            this.router.navigate([RouterEnum.Auth]);
            return [
              UserActions.RegistrationSuccess(),
              SharedActions.PrintNzMessageSuccess({
                payload: NzMessage.REGISTRATION_SUCCESS,
              }),
            ];
          }),
          catchError((err) => {
            return of(
              UserActions.RegistrationError(),
              SharedActions.PrintNzMessageError({
                payload: err.error.message,
              })
            );
          })
        )
      )
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Login),
      switchMap((action) =>
        this.authService.login(action.payload).pipe(
          switchMap(() => {
            this.router.navigate([RouterEnum.Index]);
            return [
              UserActions.LoginSuccess(),
              SharedActions.PrintNzMessageSuccess({
                payload: NzMessage.LOGIN_SUCCESS,
              }),
            ];
          }),
          catchError((err) => {
            return of(
              SharedActions.PrintNzMessageError({
                payload: err.error.message,
              }),
              UserActions.LoginError()
            );
          })
        )
      )
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUserInfo),
      map(() => {
        const { id, username } = this.authService.jwtDecode();
        return UserActions.GetUserInfoSuccess({ payload: { id, username } });
      })
    );
  });
}
