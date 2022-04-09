import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { Logout } from './../store/user/user.actions';
import { RouterEnum } from './../shared/enums/Router.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req;

    if (this.userService.token) {
      newReq = this.addTokenHeader(req, this.userService.token);
    }

    return next.handle(newReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(newReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.userService.refresh().pipe(
      switchMap(() => {
        return next.handle(
          this.addTokenHeader(request, this.userService.token)
        );
      }),
      catchError(err => {
        this.store.dispatch(Logout());
        void this.router.navigate([RouterEnum.Auth]);
        return throwError(() => err);
      })
    );
  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }
}
