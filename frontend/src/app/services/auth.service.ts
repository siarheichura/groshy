import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from '../shared/interfaces/User';
import { BehaviorSubject, tap, Observable } from 'rxjs';

enum AuthUrlEnum {
  Registration = '/registration',
  Login = '/login',
}

const LocalStorageUserKey = 'user';

interface Token {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  authLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem(LocalStorageUserKey)!;
  }

  registration(user: User): Observable<{}> {
    return this.http.post(
      `${environment.apiUrl}${AuthUrlEnum.Registration}`,
      user
    );
  }

  login(user: User): Observable<Token> {
    return this.http
      .post<Token>(`${environment.apiUrl}${AuthUrlEnum.Login}`, user)
      .pipe(tap((token) => this.setToken(token)));
  }

  logout(): void {
    localStorage.removeItem(LocalStorageUserKey);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(response: Token): void {
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
