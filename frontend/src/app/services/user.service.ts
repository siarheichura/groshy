import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap, Observable } from 'rxjs'

import { environment } from 'environments/environment'
import { HTTP } from '@shared/interfaces/Http.interface'
import { AuthResponse } from '@shared/interfaces/AuthResponse.interface'
import { RegistrationUser, User, UserLogin } from '@shared/interfaces/User'
import { API_PATHS } from '@shared/enums/ApiPaths.enum'

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
  }

  get userId(): string {
    return localStorage.getItem(environment.LocalStorageUserKey)
  }

  get token(): string {
    return localStorage.getItem(environment.LocalStorageTokenKey)
  }

  setUserDataToLS(userData: AuthResponse): void {
    localStorage.setItem(environment.LocalStorageTokenKey, userData.token)
    localStorage.setItem(environment.LocalStorageUserKey, userData.user.id)
  }

  removeUserDataFromLS(): void {
    localStorage.removeItem(environment.LocalStorageTokenKey)
    localStorage.removeItem(environment.LocalStorageUserKey)
  }

  registration(user: RegistrationUser): Observable<HTTP<User>> {
    return this.http.post<HTTP<User>>(`${environment.apiUrl}${API_PATHS.REGISTRATION}`, user)
  }

  login(user: UserLogin): Observable<HTTP<AuthResponse>> {
    return this.http.post<HTTP<AuthResponse>>(`${environment.apiUrl}${API_PATHS.LOGIN}`, user)
      .pipe(tap(resp => this.setUserDataToLS(resp.data)))
  }

  logout() {
    this.removeUserDataFromLS()
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${API_PATHS.USER}/${id}`)
  }
}
