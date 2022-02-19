import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import dayjs, { Dayjs } from 'dayjs';

import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { Income } from 'src/app/shared/interfaces/Income';
import { Expense } from 'src/app/shared/interfaces/Expense';
import {
  GetExpensesByPeriod,
  GetIncomeByPeriod,
  GetMoneyMoveByPeriodTemplate,
} from './../../store/wallets/wallets.actions';
import { moneyMoveByPeriodSelector } from './../../store/wallets/wallets.selectros';

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
  disabledDates = (date: Date): boolean => dayjs(date).isAfter(new Date());

  startDate: Dayjs = dayjs(this.date).startOf('month').add(1, 'day');
  finishDate: Dayjs =
    dayjs(this.date).endOf('month').add(1, 'day') > dayjs()
      ? dayjs().endOf('day').add(1, 'day')
      : dayjs(this.date).endOf('month').add(1, 'day');

  moneyMove$ = this.store.select(moneyMoveByPeriodSelector);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(
      GetMoneyMoveByPeriodTemplate({
        payload: {
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );

    this.store.dispatch(
      GetExpensesByPeriod({
        payload: {
          walletId: this.walletId,
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );

    this.store.dispatch(
      GetIncomeByPeriod({
        payload: {
          walletId: this.walletId,
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );
  }

  onDateChange(date: Date) {}
}
