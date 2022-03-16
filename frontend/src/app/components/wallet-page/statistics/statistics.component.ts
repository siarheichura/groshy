import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subscription, map, tap } from 'rxjs';
import { EChartsOption } from 'echarts';
import dayjs from 'dayjs';

import { MoneyMoveStat } from './../../../shared/interfaces/MoneyMoveStat.interface';
import { GetMoneyMoveStatistics } from './../../../store/wallets/wallets.actions';
import { currentTabSelector } from 'src/app/store/shared/shared.selectros';
import {
  moneyMoveStatisticsSelector,
  walletCurrencySelector,
} from './../../../store/wallets/wallets.selectros';

@UntilDestroy()
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  options: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: `<strong>{b}</strong> : {c} ({d}%)`,
    },
  };

  datePicker = new FormControl(new Date());
  disabledDates = (date: Date): boolean =>
    dayjs(date).isAfter(dayjs(), 'month');

  walletId: string = (this.route.parent.snapshot.params as { id: string }).id;
  moneyMoveType: string;
  totalMoneyMoveSum: number;

  currency$: Observable<string> = this.store.select(walletCurrencySelector);

  currentTab$: Observable<string> = this.store.select(currentTabSelector);
  currentTabSubs: Subscription = this.currentTab$
    .pipe(untilDestroyed(this))
    .subscribe((resp) => {
      this.moneyMoveType = resp;
      this.getStatistics(this.datePicker.value);
    });

  statistics$ = this.store.select(moneyMoveStatisticsSelector);
  statisticsSubs: Subscription = this.statistics$
    .pipe(untilDestroyed(this))
    .subscribe((resp) => {
      this.totalMoneyMoveSum = resp.reduce(
        (prev, curr) => (this.totalMoneyMoveSum = prev + curr.amount),
        0
      );
      this.setPieOptions(resp);
    });

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {}

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

  setPieOptions(data: MoneyMoveStat[]) {
    this.options.series = {
      type: 'pie',
      radius: '95%',
      itemStyle: {
        borderRadius: 7,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
      },
      data: data.map((item) => ({
        value: item.amount,
        name: item.category.name,
      })),
    };
  }

  onDateChange() {
    this.statistics$.pipe(untilDestroyed(this)).subscribe((resp) => {
      this.getStatistics(this.datePicker.value);
      this.setPieOptions(resp);
    });
  }
}
