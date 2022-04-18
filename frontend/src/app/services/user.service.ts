import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { HTTP } from '@shared/interfaces/Http.interface';
import {
  SignUpUser,
  User,
  UserLogin,
  Passwords,
} from '@shared/interfaces/User';

const API_PATH_REGISTRATION = '/registration';
const API_PATH_LOGIN = '/login';
const API_PATH_LOGOUT = '/logout';
const API_PATH_REFRESH = '/refresh';
const API_PATH_USER = '/user';
const API_PATH_USER_UPDATE = '/user-update';

const API_PATH_CHANGE_PASSWORD = '/change-password';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  get token(): string {
    return localStorage.getItem(environment.LocalStorageUserKey)!;
  }

  get decodedToken(): User {
    return this.jwtHelper.decodeToken(this.token);
  }

  setToken(token: string): void {
    localStorage.setItem(environment.LocalStorageUserKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(environment.LocalStorageUserKey);
  }

  registration(user: SignUpUser): Observable<HTTP<User>> {
    return this.http.post<HTTP<User>>(
      `${environment.apiUrl}${API_PATH_REGISTRATION}`,
      user
    );
  }

  login(user: UserLogin): Observable<HTTP<AuthResponse>> {
    return this.http
      .post<HTTP<AuthResponse>>(
        `${environment.apiUrl}${API_PATH_LOGIN}`,
        user,
        { withCredentials: true }
      )
      .pipe(tap(resp => this.setToken(resp.data.accessToken)));
  }

  logout() {
    this.removeToken();
    return this.http.post(`${environment.apiUrl}${API_PATH_LOGOUT}`, null);
  }

  refresh(): Observable<HTTP<AuthResponse>> {
    return this.http
      .post<HTTP<AuthResponse>>(`${environment.apiUrl}${API_PATH_REFRESH}`, {
        withCredentials: true,
      })
      .pipe(tap(resp => this.setToken(resp.data.accessToken)));
  }

  updateUserInfo(
    id: string,
    username: string,
    email: string,
    emoji: string
  ): Observable<HTTP<User>> {
    return this.http.put<HTTP<User>>(
      `${environment.apiUrl}${API_PATH_USER_UPDATE}/${id}`,
      { username, email, emoji }
    );
  }

  changePassword(userId: string, passwords: Passwords): Observable<HTTP<User>> {
    return this.http.post<HTTP<User>>(
      `${environment.apiUrl}${API_PATH_CHANGE_PASSWORD}/${userId}`,
      passwords
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${API_PATH_USER}/${id}`);
  }
}
