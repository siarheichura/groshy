import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { GetOperationsStatistics, SetOperationsPeriod } from '@store/operations/operations.actions'
import { operationsStatisticsSelector } from '@store/operations/operations.selectors'
import dayjs, { Dayjs } from 'dayjs'

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
  datePicker = new FormControl(new Date())
  chartOptions: ChartOptions[]
  totalOperationsValuesAmount: number

  startDate: Dayjs = dayjs(this.datePicker.value).startOf('month')
  finishDate: Dayjs = dayjs(this.datePicker.value).endOf('month')
  disabledDates: (date: Date) => boolean

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(GetOperationsStatistics())
    this.getCharOptions()
  }

  getCharOptions(): void {
    this.store.select(operationsStatisticsSelector)
      .pipe(untilDestroyed(this))
      .subscribe(resp => {
        this.chartOptions = resp
          .filter(item => item.value)
          .sort((a, b) => b.value - a.value)

        this.totalOperationsValuesAmount = resp
          .reduce((prev, curr) => (prev + curr.value), 0)
      })
  }

  onDateChange(): void {
    this.startDate = dayjs(this.datePicker.value).startOf('month')
    this.finishDate = dayjs(this.datePicker.value).endOf('month')
    this.store.dispatch(SetOperationsPeriod({ payload: { startDate: this.startDate, finishDate: this.finishDate } }))
    this.store.dispatch(GetOperationsStatistics())
  }


  // getStatistics(datePickerValue: Date): void {
  //   const startDate = dayjs(datePickerValue).startOf('month');
  //   const finishDate =
  //     dayjs(datePickerValue).endOf('month') > dayjs()
  //       ? dayjs(datePickerValue).endOf('day')
  //       : dayjs(datePickerValue).endOf('month');
  //   this.store.dispatch(
  //     GetMoneyMoveStatistics({
  //       payload: {
  //         walletId: this.walletId,
  //         type: this.moneyMoveType,
  //         startDate: startDate,
  //         finishDate: finishDate,
  //       },
  //     })
  //   );
  // }

  // setChartOptions(data: MoneyMoveStat[]) {
  //   this.chartOptions = data.map(item => ({
  //     value: item.amount,
  //     name: item.category,
  //   }));
  // }

  // onDateChange() {
  //   if (this.datePicker.value) {
  //     this.statistics$.pipe(take(1)).subscribe(resp => {
  //       this.getStatistics(this.datePicker.value);
  //       this.setChartOptions(resp);
  //     });
  //   }
  // }
}
