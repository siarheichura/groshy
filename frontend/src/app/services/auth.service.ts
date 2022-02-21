import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject, tap, Observable } from 'rxjs';
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
  authLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem(environment.LocalStorageUserKey)!;
  }

  registration(user: SignUpUser): Observable<{}> {
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
