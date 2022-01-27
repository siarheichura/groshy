import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Wallet } from '../shared/interfaces/Wallet';
import { Observable } from 'rxjs';

const API_PATH = '/wallets';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  fetchWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${environment.apiUrl}${API_PATH}`);
  }

  addWallet(body: Wallet) {
    return this.http.post(`${environment.apiUrl}${API_PATH}`, body);
  }

  removeWallet(id: string) {
    return this.http.delete(`${environment.apiUrl}${API_PATH}/${id}`);
  }

  editWallet(id: string, body: Wallet) {
    return this.http.put(`${environment.apiUrl}${API_PATH}/${id}`, body);
  }
}
