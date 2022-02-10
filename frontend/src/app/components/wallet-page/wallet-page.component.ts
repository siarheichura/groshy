import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, reduce, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Expense } from './../../shared/interfaces/Expense';
import { Income } from 'src/app/shared/interfaces/Income';
import {
  GetExpensesByPeriod,
  GetIncomeByPeriod,
} from './../../store/wallets/wallets.actions';
import {
  walletCurrencySelector,
  walletExpensesSelector,
  walletIncomeSelector,
} from 'src/app/store/wallets/wallets.selectros';
import { TabsEnum } from 'src/app/shared/enums/TabsEnum';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit {
  tabs = [TabsEnum.Expenses, TabsEnum.Income];
  expenseCategories = ['Food', 'Car', 'Clothes', 'Sport'];
  incomeCategories = ['Salary', 'Busines', 'Gifts'];
  today: Date = new Date();

  walletId: string = (this.route.snapshot.params as { id: string }).id;
  walletCurrency$: Observable<string> = this.store.select(
    walletCurrencySelector
  );
  expenses$: Observable<Expense[]> = this.store.select(walletExpensesSelector);
  income$: Observable<Income[]> = this.store.select(walletIncomeSelector);
  expensesAmount$: Observable<number> = this.expenses$.pipe(
    map((expenses) => expenses.reduce((prev, curr) => prev + curr.amount, 0))
  );
  incomeAmount$: Observable<number> = this.income$.pipe(
    map((expenses) => expenses.reduce((prev, curr) => prev + curr.amount, 0))
  );

  displayCategories: string[] = this.expenseCategories;
  displayItems$: Observable<Expense[]> | Observable<Income[]> = this.expenses$;
  displayAmount$: Observable<number> = this.expensesAmount$;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      GetExpensesByPeriod({
        payload: { walletId: this.walletId, date: this.today, period: 'day' },
      })
    );
    this.store.dispatch(
      GetIncomeByPeriod({
        payload: { walletId: this.walletId, date: this.today, period: 'day' },
      })
    );
  }

  onTabClick(tabName: string) {
    if (tabName === TabsEnum.Expenses) {
      this.displayItems$ = this.expenses$;
      this.displayAmount$ = this.expensesAmount$;
      this.displayCategories = this.expenseCategories;
    } else {
      this.displayItems$ = this.income$;
      this.displayAmount$ = this.incomeAmount$;
      this.displayCategories = this.incomeCategories;
    }
  }
}
