import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, catchError, of, mergeMap } from 'rxjs';
import { ofType, Actions, createEffect, act } from '@ngrx/effects';

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
          mergeMap((data) => {
            this.router.navigate([RouterEnum.Auth]);
            return [
              UserActions.RegistrationSuccess({ payload: data.data }),
              SharedActions.PrintNzMessageSuccess({
                payload: data.message,
              }),
            ];
          }),
          catchError((err) => {
            return of(
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
          mergeMap((data) => {
            this.router.navigate([RouterEnum.Index]);
            return [
              UserActions.LoginSuccess({ payload: data.data.user }),
              SharedActions.PrintNzMessageSuccess({
                payload: data.message,
              }),
            ];
          }),
          catchError((err) => {
            return of(
              SharedActions.PrintNzMessageError({
                payload: err.error.message,
              })
            );
          })
        )
      )
    );
  });

  checkAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.CheckAuth),
      switchMap(() =>
        this.authService
          .checkAuth()
          .pipe(
            map((data) => UserActions.CheckAuthSuccess({ payload: data.user }))
          )
      )
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.Logout),
        switchMap(() => this.authService.logout())
      );
    },
    { dispatch: false }
  );

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUser),
      switchMap((action) =>
        this.authService
          .getUser(action.payload)
          .pipe(map((data) => UserActions.GetUserSuccess({ payload: data })))
      )
    );
  });
}
