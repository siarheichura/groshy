import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import dayjs, { Dayjs } from 'dayjs';

import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';
import {
  GetExpensesByMonth,
  GetIncomeByMonth,
  GetMonthDays,
} from './../../store/wallets/wallets.actions';
import {
  monthMoneyMoveSelector,
  walletCurrencySelector,
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
export class HistoryPageComponent implements OnInit {
  tabNames = TabsEnum;
  tabs = [TabsEnum.Expenses, TabsEnum.Income];
  date = new Date();
  walletId: string = (this.route.parent?.snapshot.params as { id: string }).id;
  disabledDates = (date: Date): boolean => dayjs(date).isAfter(this.date);

  monthMoneyMove$: Observable<MonthMoneyMove[]> = this.store.select(
    monthMoneyMoveSelector
  );
  walletCurrency$: Observable<string> = this.store.select(
    walletCurrencySelector
  );

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(GetMonthDays({ payload: this.date }));

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

  onDateChange(date: Date) {
    this.store.dispatch(GetMonthDays({ payload: date }));

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
}
