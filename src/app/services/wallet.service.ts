import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BehaviorSubject, map, Observable, Subject} from 'rxjs';
import {Wallet2021, Wallet2022, WalletClass, WalletInterface} from "../models/WalletInterface";


export abstract class HTTPWalletService {
  abstract fetchWallets(): Observable<WalletClass[]>
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {
    console.log('WalletService1')
  }

  fetchWallets(): Observable<WalletClass[]> {
    return this.http.get<WalletClass[]>('assets/mock/wallets.json')
      .pipe(map((items) => items.map((item, index) => index % 2 ? new Wallet2021(item) :  new Wallet2021(item))));
  }

  getWalletById(id: string) {}

  addWallet() {}

  removeWallet() {}
}

@Injectable({
  providedIn: 'root',
})
export class WalletService2 {
  constructor(private http: HttpClient) {
    console.log('WalletService2')
  }

  fetchWallets(): Observable<WalletClass[]> {
    return this.http.get<WalletClass[]>('assets/mock/wallets.json')
      .pipe(map((items) => items.map((item, index) => index % 2 ? new Wallet2022(item) :  new Wallet2022(item))));
  }

  getWalletById(id: string) {}

  addWallet() {}

  removeWallet() {}
}
