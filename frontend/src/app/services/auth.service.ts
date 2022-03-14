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

interface Token {
  token: string;
}

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

  registration(user: SignUpUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}${API_PATH_REGISTRATION}`,
      user
    );
  }

  login(user: UserLogin): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}${API_PATH_LOGIN}`, user)
      .pipe(tap((resp) => this.setToken(resp.accessToken)));
  }

  logout() {
    this.removeToken();
    return this.http.post(`${environment.apiUrl}${API_PATH_LOGOUT}`, null);
  }

  checkAuth(): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${environment.apiUrl}${API_PATH_REFRESH}`)
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

  // jwtDecode() {
  //   try {
  //     return JSON.parse(atob(this.token!.split('.')[1]));
  //   } catch (error) {
  //     return null;
  //   }
  // }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${API_PATH_USER}/${id}`);
  }
}
