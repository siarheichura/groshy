import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Wallet } from './../models/Wallet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  fetchWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('assets/mock/wallets.json');
  }

  getWalletById(id: string) {}

  addWallet() {}

  removeWallet() {}
}
