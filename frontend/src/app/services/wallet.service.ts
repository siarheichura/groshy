import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from './../../environments/environment';

// export interface HTTPData<T> {
//   data: T;
// }

export interface HTTP<T> {
  // data: HTTPData<T>;
  data: T;
  error?: string;
  message?: string;
}

import {
  PeriodMoneyMove,
  MoneyMoveItem,
  MoneyMoveCategory,
} from './../shared/interfaces/DayMoneyMove';
import { Wallet } from '../shared/interfaces/Wallet';
import { Dayjs } from 'dayjs';

const API_PATH_WALLETS = '/wallets';
const API_PATH_CATEGORIES = '/categories';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(): Observable<HTTP<Wallet[]>> {
    return this.http
      .get<HTTP<Wallet[]>>(`${environment.apiUrl}${API_PATH_WALLETS}`)
      .pipe(
        map((data) => {
          data.data = data.data.map((wallet) => new Wallet(wallet));
          return data;
        })
      );
  }

  getWallet(id: string): Observable<HTTP<Wallet>> {
    return this.http
      .get<HTTP<Wallet>>(`${environment.apiUrl}${API_PATH_WALLETS}/${id}`)
      .pipe(
        map((data) => {
          data.data = new Wallet(data.data);
          return data;
        })
      );
  }

  addWallet(body: Wallet): Observable<HTTP<Wallet>> {
    return this.http
      .post<HTTP<Wallet>>(`${environment.apiUrl}${API_PATH_WALLETS}`, body)
      .pipe(
        map((data) => {
          data.data = new Wallet(data.data);
          return data;
        })
      );
  }

  removeWallet(id: string): Observable<{}> {
    return this.http.delete<Wallet>(
      `${environment.apiUrl}${API_PATH_WALLETS}/${id}`
    );
  }

  editWallet(id: string, body: Wallet): Observable<{}> {
    return this.http.put<Wallet>(
      `${environment.apiUrl}${API_PATH_WALLETS}/${id}`,
      body
    );
  }

  getCategories(
    walletId: string,
    type: string
  ): Observable<MoneyMoveCategory[]> {
    return this.http.get<MoneyMoveCategory[]>(
      `${environment.apiUrl}${API_PATH_CATEGORIES}/${walletId}/${type}`
    );
  }

  getMoneyMoveByPeriod(
    walletId: string,
    type: string,
    startDate: Dayjs,
    finishDate?: Dayjs
  ): Observable<PeriodMoneyMove> {
    return this.http
      .get<MoneyMoveItem[]>(
        `${environment.apiUrl}/${type}/${walletId}/${startDate}/${finishDate}`
      )
      .pipe(map((items) => new PeriodMoneyMove(items, startDate, finishDate)));
  }

  addMoneyMoveItem(
    type: string,
    walletId: string,
    body: MoneyMoveItem
  ): Observable<MoneyMoveItem> {
    return this.http.post<MoneyMoveItem>(
      `${environment.apiUrl}/${type}/${walletId}`,
      body
    );
  }

  removeMoneyMoveItem(type: string, id: string): Observable<MoneyMoveItem> {
    return this.http.delete<MoneyMoveItem>(
      `${environment.apiUrl}/${type}/${id}`
    );
  }

  editMoneyMoveItem(
    type: string,
    id: string,
    body: MoneyMoveItem
  ): Observable<MoneyMoveItem> {
    return this.http.put<MoneyMoveItem>(
      `${environment.apiUrl}/${type}/${id}`,
      body
    );
  }
}
