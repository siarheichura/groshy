import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { map, switchMap, catchError, of, mergeMap } from 'rxjs'
import { ofType, Actions, createEffect, act } from '@ngrx/effects'

import { ROUTER } from '@shared/enums/Router.enum'
import { UserService } from '@services/user.service'
import * as SharedActions from '@store/shared/shared.actions'
import * as UserActions from './user.actions'

@Injectable()
export class UserEffects {
  userId: string = this.userService.userId

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private router: Router,
  ) {
  }

  registration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Registration),
      switchMap(action =>
        this.userService.registration(action.payload).pipe(
          mergeMap(data => {
            void this.router.navigate([ROUTER.AUTH])
            return [
              UserActions.RegistrationSuccess(),
              SharedActions.PrintNzMessageSuccess({ payload: data.message }),
            ]
          }),
          catchError(err => of(SharedActions.PrintNzMessageError({ payload: err.error.message }))),
        ),
      ),
    )
  })

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Login),
      switchMap(action =>
        this.userService.login(action.payload).pipe(
          mergeMap(data => {
            void this.router.navigate([ROUTER.INDEX])
            return [
              UserActions.LoginSuccess({ payload: data.data.user }),
              UserActions.GetUser(),
              SharedActions.PrintNzMessageSuccess({ payload: data.message }),
            ]
          }),
          catchError(err => of(SharedActions.PrintNzMessageError({ payload: err.error.message }))),
        ),
      ),
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Logout),
      map(() => {
        this.userService.logout()
        void this.router.navigate([ROUTER.AUTH])
      }),
    )
  }, { dispatch: false })

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUser),
      switchMap(() =>
        this.userService.getUser(this.userId)
          .pipe(map(data => UserActions.GetUserSuccess({ payload: data }))),
      ),
    )
  })
}
