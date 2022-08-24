import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'environments/environment'

import { HTTP } from '@shared/interfaces/Http.interface'
import { Wallet } from '@shared/classes/Wallet'
import { API_PATHS } from '@shared/enums/ApiPaths.enum'

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(userId: string): Observable<HTTP<Wallet[]>> {
    return this.http.get<HTTP<Wallet[]>>(`${environment.apiUrl}${API_PATHS.WALLETS}/${userId}`)
  }

  addWallet(userId: string, wallet: Wallet): Observable<HTTP<Wallet>> {
    return this.http.post<HTTP<Wallet>>(`${environment.apiUrl}${API_PATHS.WALLET}/${userId}`, wallet)
  }

  removeWallet(id: string): Observable<HTTP<Wallet>> {
    return this.http.delete<HTTP<Wallet>>(`${environment.apiUrl}${API_PATHS.WALLET}/${id}`);
  }

  editWallet(id: string, body: Wallet): Observable<HTTP<Wallet>> {
    return this.http.put<HTTP<Wallet>>(`${environment.apiUrl}${API_PATHS.WALLET}/${id}`, body)
  }
}
