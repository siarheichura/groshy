import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Wallet } from '../shared/interfaces/Wallet';
import { Observable } from 'rxjs';

const API_PATH = '/wallets';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${environment.apiUrl}${API_PATH}`);
  }

  getWallet(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.apiUrl}${API_PATH}/${id}`);
  }

  addWallet(body: Wallet): Observable<{}> {
    return this.http.post<Wallet>(`${environment.apiUrl}${API_PATH}`, body);
  }

  removeWallet(id: string): Observable<{}> {
    return this.http.delete<Wallet>(`${environment.apiUrl}${API_PATH}/${id}`);
  }

  editWallet(id: string, body: Wallet): Observable<{}> {
    return this.http.put<Wallet>(
      `${environment.apiUrl}${API_PATH}/${id}`,
      body
    );
  }
}
