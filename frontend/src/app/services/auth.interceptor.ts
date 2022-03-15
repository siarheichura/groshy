import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError, tap, take } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Logout } from './../store/user/user.actions';
import { RouterEnum } from './../shared/enums/Router.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.store.dispatch(Logout());
          this.router.navigate([RouterEnum.Auth]);
        }
        return throwError(() => err);
      })
    );
  }
}
