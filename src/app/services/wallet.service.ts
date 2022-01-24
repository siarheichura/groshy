import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Wallet } from '../interfaces/Wallet';
import { Observable } from 'rxjs';

const API_PATH = '/wallets';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  fetchWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${environment.apiUrl}${API_PATH}`);
    // return this.http.get<Wallet[]>('assets/mock/wallets.json');
  }

  addWallet() {
    return this.http.post(`${environment.apiUrl}${API_PATH}`, {
      name: 'lol',
      currency: 'kek',
      amount: 500,
    });
  }

  removeWallet() {}

  getWalletById(id: string) {}
}
