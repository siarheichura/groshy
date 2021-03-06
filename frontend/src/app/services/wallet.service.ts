import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Dayjs } from 'dayjs';
import { environment } from 'environments/environment';

import { MoneyMoveCategory } from '@shared/interfaces/MoneyMoveCategory.interface';
import { MoneyMoveItem } from '@shared/interfaces/MoneyMoveItem.interface';
import { HTTP } from '@shared/interfaces/Http.interface';
import { Wallet } from '@shared/classes/Wallet';
import { MoneyMoveStat } from '@shared/interfaces/MoneyMoveStat.interface';

const API_PATH_WALLETS = '/wallets';
const API_PATH_CATEGORIES = '/categories';
const API_PATH_STATISTICS = '/statistics';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(): Observable<HTTP<Wallet[]>> {
    return this.http
      .get<HTTP<Wallet[]>>(`${environment.apiUrl}${API_PATH_WALLETS}`)
      .pipe(
        map(data => {
          data.data = data.data.map(wallet => new Wallet(wallet));
          return data;
        })
      );
  }

  getWallet(id: string): Observable<HTTP<Wallet>> {
    return this.http
      .get<HTTP<Wallet>>(`${environment.apiUrl}${API_PATH_WALLETS}/${id}`)
      .pipe(
        map(data => {
          data.data = new Wallet(data.data);
          return data;
        })
      );
  }

  addWallet(body: Wallet): Observable<HTTP<Wallet>> {
    return this.http
      .post<HTTP<Wallet>>(`${environment.apiUrl}${API_PATH_WALLETS}`, body)
      .pipe(
        map(data => {
          data.data = new Wallet(data.data);
          return data;
        })
      );
  }

  removeWallet(id: string): Observable<HTTP<string>> {
    return this.http.delete<HTTP<string>>(
      `${environment.apiUrl}${API_PATH_WALLETS}/${id}`
    );
  }

  editWallet(id: string, body: Wallet): Observable<HTTP<string>> {
    return this.http.put<HTTP<string>>(
      `${environment.apiUrl}${API_PATH_WALLETS}/${id}`,
      body
    );
  }

  getWalletCategories(walletId: string): Observable<HTTP<MoneyMoveCategory[]>> {
    return this.http.get<HTTP<MoneyMoveCategory[]>>(
      `${environment.apiUrl}${API_PATH_CATEGORIES}/${walletId}`
    );
  }

  addCategory(
    walletId: string,
    body: MoneyMoveCategory
  ): Observable<HTTP<MoneyMoveCategory>> {
    return this.http.post<HTTP<MoneyMoveCategory>>(
      `${environment.apiUrl}${API_PATH_CATEGORIES}/${walletId}`,
      body
    );
  }

  removeCategory(id: string): Observable<HTTP<string>> {
    return this.http.delete<HTTP<string>>(
      `${environment.apiUrl}${API_PATH_CATEGORIES}/${id}`
    );
  }

  getMoneyMoveByPeriod(
    walletId: string,
    type: string,
    startDate: Dayjs,
    finishDate?: Dayjs
  ): Observable<HTTP<MoneyMoveItem[]>> {
    return this.http.get<HTTP<MoneyMoveItem[]>>(
      `${environment.apiUrl}/${type}/${walletId}/${startDate}/${finishDate}`
    );
  }

  getMoneyMoveStatistic(
    walletId: string,
    type: string,
    startDate: Dayjs,
    finishDate?: Dayjs
  ): Observable<HTTP<MoneyMoveStat[]>> {
    return this.http.get<HTTP<MoneyMoveStat[]>>(
      `${environment.apiUrl}/${type}${API_PATH_STATISTICS}/${walletId}/${startDate}/${finishDate}`
    );
  }

  addMoneyMoveItem(
    type: string,
    walletId: string,
    body: MoneyMoveItem
  ): Observable<HTTP<MoneyMoveItem>> {
    return this.http.post<HTTP<MoneyMoveItem>>(
      `${environment.apiUrl}/${type}/${walletId}`,
      body
    );
  }

  removeMoneyMoveItem(
    type: string,
    id: string
  ): Observable<HTTP<MoneyMoveItem>> {
    return this.http.delete<HTTP<MoneyMoveItem>>(
      `${environment.apiUrl}/${type}/${id}`
    );
  }

  editMoneyMoveItem(
    type: string,
    id: string,
    body: MoneyMoveItem
  ): Observable<HTTP<MoneyMoveItem>> {
    return this.http.put<HTTP<MoneyMoveItem>>(
      `${environment.apiUrl}/${type}/${id}`,
      body
    );
  }
}
