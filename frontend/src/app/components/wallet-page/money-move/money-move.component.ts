import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import dayjs, { Dayjs } from 'dayjs';

import { NzModalService } from 'ng-zorro-antd/modal';
import { walletCreationDateSelector } from './../../../store/wallets/wallets.selectros';
import {
  AddMoneyMoveItem,
  EditMoneyMoveItem,
  GetMoneyMoveByPeriod,
  RemoveMoneyMoveItem,
} from './../../../store/wallets/wallets.actions';
import {
  periodMoneyMoveSelector,
  walletCurrencySelector,
} from 'src/app/store/wallets/wallets.selectros';
import { currentTabSelector } from './../../../store/shared/shared.selectros';
import { MoneyMoveFormComponent } from './../money-move-form/money-move-form.component';
import { MoneyMoveItem } from './../../../shared/interfaces/MoneyMoveItem.interface';
import { MoneyMoveDayItem } from 'src/app/shared/classes/MoneyMoveDayItem';
import { MODAL_WIDTH } from './../../../shared/constants/constants';

@UntilDestroy()
@Component({
  selector: 'app-money-move',
  templateUrl: './money-move.component.html',
  styleUrls: ['./money-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMoveComponent implements OnInit {
  datePicker = new FormControl(new Date());
  disabledDates: (date: Date) => boolean;
  walletId: string = (this.route.snapshot.params as { id: string }).id;
  moneyMoveType: string;
  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  moneyMove$: Observable<MoneyMoveDayItem[]> = this.store
    .select(periodMoneyMoveSelector)
    .pipe(
      map(items =>
        dayjs(this.datePicker.value).isSame(dayjs(), 'month')
          ? items.slice().reverse()
          : items
      )
    );

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modal: NzModalService
  ) {}

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

        this.getMoneyMoveItems(this.datePicker.value);
      });
  }

  getMoneyMoveItems(datePickerValue: Date): void {
    const startDate = dayjs(datePickerValue).startOf('month');
    const finishDate =
      dayjs(datePickerValue).endOf('month') > dayjs()
        ? dayjs(datePickerValue).endOf('day')
        : dayjs(datePickerValue).endOf('month');

    this.store.dispatch(
      GetMoneyMoveByPeriod({
        payload: {
          walletId: this.walletId,
          type: this.moneyMoveType,
          startDate,
          finishDate,
        },
      })
    );
  }

  printAddMoneyMoveItemModal() {
    const modal = this.modal.create({
      nzTitle: `Add ${this.moneyMoveType}`,
      nzFooter: null,
      nzWidth: MODAL_WIDTH,
      nzContent: MoneyMoveFormComponent,
      nzComponentParams: {
        moneyMoveType: this.moneyMoveType,
      },
    });

    modal.afterClose.subscribe(res => {
      if (res) {
        this.addMoneyMoveItem(res);
      }
    });
  }

  printEditMoneyMoveItemModal(item: MoneyMoveItem) {
    const modal = this.modal.create({
      nzTitle: `Edit ${this.moneyMoveType}`,
      nzFooter: null,
      nzWidth: MODAL_WIDTH,
      nzContent: MoneyMoveFormComponent,
      nzComponentParams: {
        moneyMoveType: this.moneyMoveType,
        moneyMoveItem: item,
      },
    });

    modal.afterClose.subscribe(res => {
      if (res) {
        this.editMoneyMoveItem(item, res);
      }
    });
  }

  addMoneyMoveItem(item: MoneyMoveItem) {
    this.store.dispatch(
      AddMoneyMoveItem({
        payload: {
          type: this.moneyMoveType,
          walletId: this.walletId,
          item: item,
        },
      })
    );
  }

  removeMoneyMoveItem(id: string) {
    this.store.dispatch(
      RemoveMoneyMoveItem({
        payload: {
          type: this.moneyMoveType,
          itemId: id,
          walletId: this.walletId,
        },
      })
    );
  }

  editMoneyMoveItem(item: MoneyMoveItem, updatedItem: MoneyMoveItem) {
    const startDate = dayjs(this.datePicker.value).startOf('month');
    const finishDate: Dayjs =
      dayjs(this.datePicker.value).endOf('month') > dayjs()
        ? dayjs(this.datePicker.value).endOf('day')
        : dayjs(this.datePicker.value).endOf('month');

    this.store.dispatch(
      EditMoneyMoveItem({
        payload: {
          type: this.moneyMoveType,
          itemId: item.id,
          updatedItem: updatedItem,
          walletId: this.walletId,
          startDate: startDate,
          finishDate: finishDate,
        },
      })
    );
  }

  onDateChange() {
    if (this.datePicker.value) {
      const startDate = dayjs(this.datePicker.value).startOf('month');
      const finishDate: Dayjs =
        dayjs(this.datePicker.value).endOf('month') > dayjs()
          ? dayjs(this.datePicker.value).endOf('day')
          : dayjs(this.datePicker.value).endOf('month');

      this.store.dispatch(
        GetMoneyMoveByPeriod({
          payload: {
            walletId: this.walletId,
            type: this.moneyMoveType,
            startDate: startDate,
            finishDate: finishDate,
          },
        })
      );
    }
  }

  onSortBtnClick() {
    this.moneyMove$ = this.moneyMove$.pipe(
      map(items => items.slice().reverse())
    );
  }
}
