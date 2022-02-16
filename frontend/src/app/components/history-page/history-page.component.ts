import { ActivatedRoute, Router } from '@angular/router';
import {
  GetExpensesByMonth,
  GetIncomeByMonth,
} from './../../store/wallets/wallets.actions';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import dayjs, { Dayjs } from 'dayjs';

import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';
import {
  walletCurrencySelector,
  walletExpensesByMonthSelector,
  walletIncomeByMonthSelector,
} from 'src/app/store/wallets/wallets.selectros';

interface MonthMoneyMove {
  date: Dayjs;
  expenses: Expense[];
  income: Income[];
  expensesSum: number;
  incomeSum: number;
}

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  tabNames = TabsEnum;
  tabs = [TabsEnum.Expenses, TabsEnum.Income];
  date = new Date();
  monthMoneyMove: MonthMoneyMove[] = [];
  walletId: string = (this.route.parent?.snapshot.params as { id: string }).id;

  walletCurrency$: Observable<string> = this.store.select(
    walletCurrencySelector
  );

  expenses$: Observable<Expense[]> = this.store.select(
    walletExpensesByMonthSelector
  );
  expensesSub$ = this.expenses$.subscribe((expenses) => {
    this.monthMoneyMove.forEach((item) => {
      item.expenses = expenses.filter((expense) =>
        dayjs(expense.date).isSame(item.date, 'day')
      );
      item.expensesSum = item.expenses.reduce(
        (prev, curr) => prev + curr.amount,
        0
      );
    });
  });

  income$: Observable<Income[]> = this.store.select(
    walletIncomeByMonthSelector
  );
  incomeSub$ = this.income$.subscribe((income) => {
    this.monthMoneyMove.forEach((item) => {
      item.income = income.filter((income) =>
        dayjs(income.date).isSame(item.date, 'day')
      );
      item.incomeSum = item.income.reduce(
        (prev, curr) => prev + curr.amount,
        0
      );
    });
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMoneyMoveArrayForMonth();

    this.store.dispatch(
      GetExpensesByMonth({
        payload: {
          walletId: this.walletId,
          date: this.date,
        },
      })
    );

    this.store.dispatch(
      GetIncomeByMonth({
        payload: {
          walletId: this.walletId,
          date: this.date,
        },
      })
    );
  }

  getMoneyMoveArrayForMonth(date: Date = this.date) {
    const result = [];

    for (let i = 1; i <= dayjs(date).daysInMonth(); i++) {
      result.push({
        date: dayjs(date).date(i),
        expenses: [],
        income: [],
        expensesSum: 0,
        incomeSum: 0,
      });
    }

    this.monthMoneyMove = result;
  }

  onDateChange(date: Date) {
    this.getMoneyMoveArrayForMonth(date);

    this.store.dispatch(
      GetExpensesByMonth({
        payload: {
          walletId: this.walletId,
          date: date,
        },
      })
    );

    this.store.dispatch(
      GetIncomeByMonth({
        payload: {
          walletId: this.walletId,
          date: date,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.expensesSub$.unsubscribe();
    this.incomeSub$.unsubscribe();
  }
}
