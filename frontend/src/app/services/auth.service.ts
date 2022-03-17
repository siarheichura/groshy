import { HTTP } from './../shared/interfaces/Http.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { tap, Observable } from 'rxjs';
import { SignUpUser, User, UserLogin } from './../shared/interfaces/User';

const API_PATH_REGISTRATION = '/registration';
const API_PATH_LOGIN = '/login';
const API_PATH_LOGOUT = '/logout';
const API_PATH_USER = '/user';
const API_PATH_REFRESH = '/refresh';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem(environment.LocalStorageUserKey)!;
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
      .pipe(tap((resp) => this.setToken(resp.data.accessToken)));
  }

  logout() {
    this.removeToken();
    return this.http.post(`${environment.apiUrl}${API_PATH_LOGOUT}`, null);
  }

  refresh(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${environment.apiUrl}${API_PATH_REFRESH}`, {
        withCredentials: true,
      })
      .pipe(tap((resp) => this.setToken(resp.accessToken)));
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(token: string): void {
    localStorage.setItem(environment.LocalStorageUserKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(environment.LocalStorageUserKey);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${API_PATH_USER}/${id}`);
  }
}
