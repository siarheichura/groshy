import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { tap, Observable } from 'rxjs';
import { SignUpUser, LoginUser } from './../shared/interfaces/User';

enum AuthUrlEnum {
  Registration = '/registration',
  Login = '/login',
}

interface Token {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem(environment.LocalStorageUserKey)!;
  }

  registration(user: SignUpUser) {
    return this.http.post(
      `${environment.apiUrl}${AuthUrlEnum.Registration}`,
      user
    );
  }

  login(user: LoginUser): Observable<Token> {
    return this.http
      .post<Token>(`${environment.apiUrl}${AuthUrlEnum.Login}`, user)
      .pipe(tap((token) => this.setToken(token)));
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(response: Token): void {
    localStorage.setItem(environment.LocalStorageUserKey, response.token);
  }

  jwtDecode() {
    try {
      return JSON.parse(atob(this.token!.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}
