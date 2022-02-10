import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

import { Wallet } from '../shared/interfaces/Wallet';
import { Income } from '../shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';

const API_PATH_WALLETS = '/wallets';
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

  // preiod = 'day' || 'month'
  getExpensesByPeriod(
    walletId: string,
    date: Date,
    period: string
  ): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${period}/${walletId}/${date}`
    );
  }

  // preiod = 'day' || 'month'
  getIncomeByPeriod(
    walletId: string,
    date: Date,
    period: string
  ): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${environment.apiUrl}${API_PATH_INCOME}/${period}/${walletId}/${date}`
    );
  }

  addExpense(walletId: string, body: Expense): Observable<Expense> {
    return this.http.post<Expense>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${walletId}`,
      body
    );
  }

  addIncome(walletId: string, body: Income): Observable<Income> {
    return this.http.post<Income>(
      `${environment.apiUrl}${API_PATH_INCOME}/${walletId}`,
      body
    );
  }
}
