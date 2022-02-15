import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Expense } from './../../shared/interfaces/Expense';
import { Income } from 'src/app/shared/interfaces/Income';
import {
  AddExpense,
  AddIncome,
  GetExpensesByDay,
  GetIncomeByDay,
} from './../../store/wallets/wallets.actions';
import {
  walletCurrencySelector,
  walletExpensesByDaySelector,
  walletIncomeByDaySelector,
} from 'src/app/store/wallets/wallets.selectros';
import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { RouterEnum } from 'src/app/shared/enums/RouterEnum';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit {
  TabsEnum: any;
  routes = RouterEnum;
  tabs = [TabsEnum.Expenses, TabsEnum.Income];
  expenseCategories = ['Food', 'Car', 'Clothes', 'Sport'];
  incomeCategories = ['Salary', 'Busines', 'Gifts'];
  today: Date = new Date();

  walletId: string = (this.route.snapshot.params as { id: string }).id;
  walletCurrency$: Observable<string> = this.store.select(
    walletCurrencySelector
  );
  expenses$: Observable<Expense[]> = this.store.select(
    walletExpensesByDaySelector
  );
  income$: Observable<Income[]> = this.store.select(walletIncomeByDaySelector);
  expensesAmount$: Observable<number> = this.expenses$.pipe(
    map((expenses) => expenses.reduce((prev, curr) => prev + curr.amount, 0))
  );
  incomeAmount$: Observable<number> = this.income$.pipe(
    map((expenses) => expenses.reduce((prev, curr) => prev + curr.amount, 0))
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      GetExpensesByDay({
        payload: { walletId: this.walletId, date: this.today },
      })
    );
    this.store.dispatch(
      GetIncomeByDay({
        payload: { walletId: this.walletId, date: this.today },
      })
    );
  }

  addExpense(formValue: Expense) {
    this.store.dispatch(
      AddExpense({
        payload: {
          expense: formValue,
          walletId: this.walletId,
        },
      })
    );
  }

  addIncome(formValue: Expense) {
    this.store.dispatch(
      AddIncome({
        payload: {
          income: formValue,
          walletId: this.walletId,
        },
      })
    );
  }

  handleRouteClick(param: string): void {
    void this.router.navigate([param], {
      relativeTo: this.route,
    });
  }
}
