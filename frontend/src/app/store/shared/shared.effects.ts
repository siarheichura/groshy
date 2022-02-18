import { mergeMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as SharedActions from './shared.actions';
import * as WalletsActions from '../wallets/wallets.actions';

@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions) {}

  loading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WalletsActions.GetWallets),
      map(() => SharedActions.Loading({ payload: true }))
    );
  });
}
