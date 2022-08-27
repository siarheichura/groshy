import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { UserService } from './user.service'
import { ROUTER } from '@shared/enums/Router.enum'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.userService.token) {
      return true
    } else {
      void this.router.navigate([ROUTER.AUTH])
      return false
    }
  }
}
