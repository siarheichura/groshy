import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {BehaviorSubject, catchError, Observable, switchMap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import {AuthService} from './auth.service';
import {Logout} from "../store/user/user.actions";
import {RouterEnum} from "../shared/enums/Router.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  retry: boolean = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
    let newReq = req;

    if (this.authService.isAuthenticated()) {
      newReq = this.addTokenHeader(req, this.authService.token);
    }

    return next.handle(newReq).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(newReq, next);
      }
      return throwError(error);
    }));

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.refreshTokenSubject.next(null);
      return this.authService.refresh().pipe(
        switchMap((newToken) => {
          return next.handle(this.addTokenHeader(request, this.authService.token));
        }),
        catchError((err) => {
          this.store.dispatch(Logout());
          void this.router.navigate([RouterEnum.Auth]);
          return throwError(err);
        })
      );

  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
