import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, Observable} from 'rxjs';
import {Wallet2021, Wallet2022, WalletClass, WalletInterface} from "../models/WalletInterface";

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  fetchWallets(): Observable<WalletClass[]> {
    return this.http.get<WalletClass[]>('assets/mock/wallets.json')
      .pipe(map((items) => items.map((item, index) => index % 2 ? new Wallet2021(item) :  new Wallet2022(item))));
  }

  getWalletById(id: string) {}

  addWallet() {}

  removeWallet() {}
}
