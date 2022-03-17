import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { Logout, Refresh } from './../store/user/user.actions';
import { RouterEnum } from './../shared/enums/Router.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  retry: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private jwtHelper: JwtHelperService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = req.clone();

    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
    }

    const isJwtExpired = this.jwtHelper.isTokenExpired(this.authService.token);

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401 && isJwtExpired) {
          this.store.dispatch(Refresh());
        } else if (error.status === 401) {
          this.store.dispatch(Logout());
          this.router.navigate([RouterEnum.Auth]);
        }
        return throwError(() => error);
      })
    );
  }
}
