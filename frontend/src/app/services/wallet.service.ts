import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from './../../environments/environment';

import { Wallet } from '../shared/interfaces/Wallet';
import { Income } from '../shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';
import { Dayjs } from 'dayjs';

const API_PATH_WALLETS = '/wallets';
const API_PATH_EXPENSES = '/expenses';
const API_PATH_INCOME = '/income';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallets(): Observable<Wallet[]> {
    return this.http
      .get<Wallet[]>(`${environment.apiUrl}${API_PATH_WALLETS}`)
      .pipe(map((wallets) => wallets.map((wallet) => new Wallet(wallet))));
  }

  getWallet(id: string): Observable<Wallet> {
    return this.http
      .get<Wallet>(`${environment.apiUrl}${API_PATH_WALLETS}/${id}`)
      .pipe(map((wallet) => new Wallet(wallet)));
  }

  addWallet(body: Wallet): Observable<Wallet> {
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

  getExpensesByPeriod(
    walletId: string,
    startDate: Dayjs,
    finishDate?: Dayjs
  ): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${walletId}/${startDate}/${finishDate}`
    );
  }
  getIncomeByPeriod(
    walletId: string,
    startDate: Dayjs,
    finishDate?: Dayjs
  ): Observable<Income[]> {
    return this.http.get<Income[]>(
      `${environment.apiUrl}${API_PATH_INCOME}/${walletId}/${startDate}/${finishDate}`
    );
  }

  addExpense(walletId: string, body: Expense): Observable<Expense> {
    return this.http.post<Expense>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${walletId}`,
      body
    );
  }

  removeExpense(expenseId: string): Observable<Expense> {
    return this.http.delete<Expense>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${expenseId}`
    );
  }

  editExpense(expenseId: string, body: Expense): Observable<Expense> {
    return this.http.post<Expense>(
      `${environment.apiUrl}${API_PATH_EXPENSES}/${expenseId}`,
      body
    );
  }

  addIncome(walletId: string, body: Income): Observable<Income> {
    return this.http.post<Income>(
      `${environment.apiUrl}${API_PATH_INCOME}/${walletId}`,
      body
    );
  }

  removeIncome(incomeId: string): Observable<Income> {
    return this.http.delete<Income>(
      `${environment.apiUrl}${API_PATH_INCOME}/${incomeId}`
    );
  }

  editIncome(incomeId: string, body: Expense): Observable<Income> {
    return this.http.post<Income>(
      `${environment.apiUrl}${API_PATH_INCOME}/${incomeId}`,
      body
    );
  }
}
