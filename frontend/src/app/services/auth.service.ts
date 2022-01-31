import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from '../shared/interfaces/User';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('user-token');
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/registration`, user);
  }

  login(user: User) {
    return this.http
      .post(`${environment.apiUrl}/login`, user)
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  setToken(response: any) {
    localStorage.setItem('user-token', response.token);
  }
}
