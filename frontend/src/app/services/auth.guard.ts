import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './user.service';
import { RouterEnum } from 'src/app/shared/enums/Router.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.token) {
      return true;
    } else {
      this.router.navigate([RouterEnum.Auth]);
      return false;
    }
  }
}
