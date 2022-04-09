import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subscription, take } from 'rxjs';
import dayjs from 'dayjs';

import { MoneyMoveStat } from '@shared/interfaces/MoneyMoveStat.interface';
import { GetMoneyMoveStatistics } from '@store/wallets/wallets.actions';
import { currentTabSelector } from '@store/shared/shared.selectros';
import {
  moneyMoveStatisticsSelector,
  walletCreationDateSelector,
  walletCurrencySelector,
} from '@store/wallets/wallets.selectros';

interface ChartOptions {
  value: number;
  name: string;
}

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  chartOptions: ChartOptions[];
  datePicker = new FormControl(new Date());
  disabledDates: (date: Date) => boolean;
  walletId: string = (this.route.parent.snapshot.params as { id: string }).id;
  moneyMoveType: string;
  totalMoneyMoveSum: number;
  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  statistics$: Observable<MoneyMoveStat[]> = this.store.select(
    moneyMoveStatisticsSelector
  );
  statisticsSubs: Subscription = this.statistics$
    .pipe(untilDestroyed(this))
    .subscribe(resp => {
      this.totalMoneyMoveSum = resp.reduce(
        (prev, curr) => (this.totalMoneyMoveSum = prev + curr.amount),
        0
      );
      this.setChartOptions(resp);
    });

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.select(walletCreationDateSelector).subscribe(resp => {
      this.disabledDates = (date: Date): boolean =>
        dayjs(date).isAfter(dayjs(), 'month') ||
        dayjs(date).isBefore(dayjs(resp), 'month');
    });

    this.store
      .select(currentTabSelector)
      .pipe(untilDestroyed(this))
      .subscribe(resp => {
        this.moneyMoveType = resp;
        this.getStatistics(this.datePicker.value);
      });
  }

  getStatistics(datePickerValue: Date): void {
    const startDate = dayjs(datePickerValue).startOf('month');
    const finishDate =
      dayjs(datePickerValue).endOf('month') > dayjs()
        ? dayjs(datePickerValue).endOf('day')
        : dayjs(datePickerValue).endOf('month');
    this.store.dispatch(
      GetMoneyMoveStatistics({
        payload: {
          walletId: this.walletId,
          type: this.moneyMoveType,
          startDate: startDate,
          finishDate: finishDate,
        },
      })
    );
  }

  setChartOptions(data: MoneyMoveStat[]) {
    this.chartOptions = data.map(item => ({
      value: item.amount,
      name: item.category,
    }));
  }

  onDateChange() {
    if (this.datePicker.value) {
      this.statistics$.pipe(take(1)).subscribe(resp => {
        this.getStatistics(this.datePicker.value);
        this.setChartOptions(resp);
      });
    }
  }
}
