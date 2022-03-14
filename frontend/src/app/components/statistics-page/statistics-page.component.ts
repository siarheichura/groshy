import { MoneyMoveDayItem } from './../../shared/classes/MoneyMoveDayItem';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { EChartsOption } from 'echarts';
import dayjs, { Dayjs } from 'dayjs';

import { currentTabSelector } from 'src/app/store/shared/shared.selectros';
import { GetMoneyMoveByPeriod } from 'src/app/store/wallets/wallets.actions';
import { periodMoneyMoveSelector } from 'src/app/store/wallets/wallets.selectros';

@UntilDestroy()
@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPageComponent implements OnInit {
  initOpts = {
    renderer: 'svg',
    width: 500,
    height: 500,
  };

  options: EChartsOption;

  startDate: Dayjs = dayjs().startOf('month');
  finishDate: Dayjs =
    dayjs().endOf('month') > dayjs()
      ? dayjs().endOf('day')
      : dayjs().endOf('month');

  walletId: string = (this.route.parent.snapshot.params as { id: string }).id;

  currentTab$: Observable<string> = this.store.select(currentTabSelector);
  curentTabSubs: Subscription = this.currentTab$
    .pipe(untilDestroyed(this))
    .subscribe((resp) => {
      this.store.dispatch(
        GetMoneyMoveByPeriod({
          payload: {
            walletId: this.walletId,
            type: resp,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    });

  moneyMove$: Observable<MoneyMoveDayItem[]> = this.store.select(
    periodMoneyMoveSelector
  );
  moneyMoveSubs: Subscription = this.moneyMove$
    .pipe(untilDestroyed(this))
    .subscribe((resp) => {
      this.options.series;
    });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  setChartOptions(data: MoneyMoveDayItem[]) {
    this.options = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Medicare Plan Type',
          type: 'pie',
          radius: '80%',
          itemStyle: {
            borderRadius: 7,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          data: [
            { value: 1048, name: 'STCOB Secondary' },
            { value: 735, name: 'Part B Medial Only (MA)' },
          ],
        },
      ],
    };
  }
}
