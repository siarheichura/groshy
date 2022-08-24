import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { Store } from '@ngrx/store'

import { UserService } from '@services/user.service'
import { Logout } from '@store/user/user.actions'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private store: Store
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req

    if (this.userService.token) {
      newReq = req.clone({
        setHeaders: {
          user: this.userService.userId,
          Authorization: `Bearer ${this.userService.token}`
        }
      })
    }

    return next.handle(newReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.store.dispatch(Logout())
        }
        return throwError(() => err)
      })
    )
  }
}
