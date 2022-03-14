import { Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { RouterEnum } from 'src/app/shared/enums/Router.enum';
import { isUserAuthSelector } from '../store/user/user.selectros';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  isAuth$: Observable<boolean> = this.store.select(isUserAuthSelector);
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.isAuth$.pipe(take(1)).subscribe((resp) => {
      this.isAuth = resp;
    });
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // if (this.isAuth) {
      return true;
    } else {
      this.router.navigate([RouterEnum.Auth]);
      return false;
    }
  }
}
