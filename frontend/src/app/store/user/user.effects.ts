import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.Login),
        map((action) => this.authService.login(action.payload))
      );
    },
    { dispatch: false }
  );
}
