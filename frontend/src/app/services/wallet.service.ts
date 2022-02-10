import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

import { Wallet } from '../shared/interfaces/Wallet';
import { Income, InitWalletIncome } from '../shared/interfaces/Income';
import { Expense, InitWalletExpenses } from 'src/app/shared/interfaces/Expense';

const API_PATH_WALLETS = '/wallets';
const API_PATH_INITIAL_EXPENSES = '/initialExpenses';
const API_PATH_INITIAL_INCOME = '/initialIncome';
const API_PATH_EXPENSES = '/expenses';
const API_PATH_INCOME = '/income';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(`${environment.apiUrl}${API_PATH_WALLETS}`);
  }

  getWallet(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(
      `${environment.apiUrl}${API_PATH_WALLETS}/${id}`
    );
  }

  addWallet(body: Wallet): Observable<{}> {
    return this.http.post<Wallet>(
      `${environment.apiUrl}${API_PATH_WALLETS}`,
      body
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

  getInitialWalletExpenses(walletId: string): Observable<InitWalletExpenses> {
    return this.http.get<InitWalletExpenses>(
      `${environment.apiUrl}${API_PATH_INITIAL_EXPENSES}/${walletId}`
    );
  }

  getInitialWalletIncome(walletId: string): Observable<InitWalletIncome> {
    return this.http.get<InitWalletIncome>(
      `${environment.apiUrl}${API_PATH_INITIAL_INCOME}/${walletId}`
    );
  }

  addExpense(walletId: string, body: Expense): Observable<Expense[]> {
    return this.http.post<Expense[]>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${walletId}`,
      body
    );
  }

  addIncome(walletId: string, body: Income): Observable<Income[]> {
    return this.http.post<Income[]>(
      `${environment.apiUrl}${API_PATH_INCOME}/${walletId}`,
      body
    );
  }
}
