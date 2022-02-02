import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from '../shared/interfaces/User';
import { BehaviorSubject, tap, Observable } from 'rxjs';

enum AuthUrlEnum {
  Registration = '/registration',
  Login = '/login',
}

const LocalStorageUserKey = 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem(LocalStorageUserKey);
  }

  registration(user: User): Observable<Object> {
    return this.http.post(
      `${environment.apiUrl}${AuthUrlEnum.Registration}`,
      user
    );
  }

  login(user: User): Observable<Response> {
    return this.http
      .post(`${environment.apiUrl}${AuthUrlEnum.Login}`, user)
      .pipe(tap(this.setToken));
  }

  logout(): void {
    localStorage.removeItem(LocalStorageUserKey);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(response: any): void {
    localStorage.setItem(LocalStorageUserKey, response.token);
  }

  jwtDecode() {
    try {
      return JSON.parse(atob(this.token!.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}
