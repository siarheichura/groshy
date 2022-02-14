import { RouterEnum } from 'src/app/shared/enums/RouterEnum';
import { Router } from '@angular/router';
import { NzMessageEnum } from 'src/app/shared/enums/NzMessagesEnum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, mergeMap, switchMap, catchError, of } from 'rxjs';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private nzMessage: NzMessageService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Login),
      switchMap((action) =>
        this.authService.login(action.payload).pipe(
          map(() => {
            this.nzMessage.success(NzMessageEnum.LOGIN_SUCCESS);
            this.router.navigate([RouterEnum.Index]);
            return UserActions.LoginSuccess({ payload: true });
          }),
          catchError((err) => {
            this.nzMessage.error(err.error.message);
            return of(UserActions.LoginError({ payload: false }));
          })
        )
      )
    );
  });

  registration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.Registration),
      switchMap((action) =>
        this.authService.registration(action.payload).pipe(
          map(() => {
            this.nzMessage.success(NzMessageEnum.REGISTRATION_SUCCESS);
            this.router.navigate([RouterEnum.Auth]);
            return UserActions.RegistrationSuccess({ payload: true });
          }),
          catchError((err) => {
            this.nzMessage.error(err.error.message);
            return of(UserActions.RegistrationError({ payload: false }));
          })
        )
      )
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUserInfo),
      map(() => {
        const decodedToken = this.authService.jwtDecode();
        const { id, username } = decodedToken;
        return UserActions.GetUserInfoSuccess({ payload: { id, username } });
      })
    );
  });
}
