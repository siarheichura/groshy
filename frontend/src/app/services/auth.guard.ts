import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { RouterEnum } from 'src/app/shared/enums/Router.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.token) {
      return true;
    } else {
      this.router.navigate([RouterEnum.Auth]);
      return false;
    }
  }
}
