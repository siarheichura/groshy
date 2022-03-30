import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, catchError, of, mergeMap } from 'rxjs';
import { ofType, Actions, createEffect, act } from '@ngrx/effects';

import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { UserService } from './../../services/user.service';
import * as UserActions from './user.actions';
import * as SharedActions from '../shared/shared.actions';

@Injectable()
export class UserEffects {
  constructor(
    private userService: UserService,
    private actions$: Actions,
    private router: Router
  ) {}

  registration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Registration),
      switchMap((action) =>
        this.userService.registration(action.payload).pipe(
          mergeMap((data) => {
            this.router.navigate([RouterEnum.Auth]);
            return [
              UserActions.RegistrationSuccess({ payload: data.data }),
              SharedActions.PrintNzMessageSuccess({
                payload: data.message,
              }),
            ];
          }),
          catchError((err) => [
            UserActions.RegistrationError(),
            SharedActions.PrintNzMessageError({
              payload: err.error.message,
            }),
          ])
        )
      )
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Login),
      switchMap((action) =>
        this.userService.login(action.payload).pipe(
          mergeMap((data) => {
            this.router.navigate([RouterEnum.Index]);
            return [
              UserActions.LoginSuccess({ payload: data.data.user }),
              SharedActions.PrintNzMessageSuccess({
                payload: data.message,
              }),
            ];
          }),
          catchError((err) => [
            UserActions.LoginError(),
            SharedActions.PrintNzMessageError({
              payload: err.error.message,
            }),
          ])
        )
      )
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.Logout),
        switchMap(() => this.userService.logout())
      );
    },
    { dispatch: false }
  );

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUser),
      switchMap((action) =>
        this.userService
          .getUser(action.payload)
          .pipe(map((data) => UserActions.GetUserSuccess({ payload: data })))
      )
    );
  });

  updateUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUserInfo),
      switchMap(({ payload }) =>
        this.userService
          .updateUserInfo(
            payload.id,
            payload.username,
            payload.email,
            payload.emoji
          )
          .pipe(
            map((data) =>
              UserActions.UpdateUserInfoSuccess({ payload: data.data })
            )
          )
      )
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.ChangePassword),
      switchMap(({ payload }) =>
        this.userService
          .changePassword(payload.userId, {
            prevPassword: payload.passwords.prevPassword,
            newPassword: payload.passwords.newPassword,
            confirmPassword: payload.passwords.confirmPassword,
          })
          .pipe(
            map((data) =>
              SharedActions.PrintNzMessageSuccess({
                payload: data.message,
              })
            ),
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
}
