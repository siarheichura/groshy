import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from '../shared/interfaces/User';
import { BehaviorSubject, tap } from 'rxjs';

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

  registration(user: User) {
    return this.http.post(
      `${environment.apiUrl}${AuthUrlEnum.Registration}`,
      user
    );
  }

  login(user: User) {
    return this.http
      .post(`${environment.apiUrl}${AuthUrlEnum.Login}`, user)
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  setToken(response: any) {
    localStorage.setItem(LocalStorageUserKey, response.token);
  }
}
