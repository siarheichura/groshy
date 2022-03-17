import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import dayjs, { Dayjs } from 'dayjs';
import { NzModalService } from 'ng-zorro-antd/modal';

import {
  AddMoneyMoveItem,
  EditMoneyMoveItem,
  GetWalletCategories,
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
import { MoneyMoveTypes } from 'src/app/shared/enums/MoneyMoveTypes.enum';
import { MoneyMoveDayItem } from 'src/app/shared/classes/MoneyMoveDayItem';
import { MODAL_WIDTH } from './../../../shared/constants/constants';

@UntilDestroy()
@Component({
  selector: 'money-move',
  templateUrl: './money-move.component.html',
  styleUrls: ['./money-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyMoveComponent implements OnInit {
  MoneyMoveTypes = MoneyMoveTypes;
  datePicker = new FormControl(new Date());

  startDate: Dayjs = dayjs(this.datePicker.value).startOf('month');
  finishDate: Dayjs =
    dayjs(this.datePicker.value).endOf('month') > dayjs()
      ? dayjs().endOf('day')
      : dayjs().endOf('month');
  disabledDates = (date: Date): boolean =>
    dayjs(date).isAfter(dayjs(), 'month');

  walletId: string = (this.route.snapshot.params as { id: string }).id;
  moneyMoveType: string;

  moneyMove$: Observable<MoneyMoveDayItem[]> = this.store.select(
    periodMoneyMoveSelector
  );

  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  currentTab$: Observable<string> = this.store.select(currentTabSelector);
  curentTabSubs: Subscription = this.currentTab$
    .pipe(untilDestroyed(this))
    .subscribe((resp) => {
      this.moneyMoveType = resp;

      this.store.dispatch(
        GetMoneyMoveByPeriod({
          payload: {
            walletId: this.walletId,
            type: this.moneyMoveType,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    });

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {}

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

    modal.afterClose.subscribe((res) => {
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

    modal.afterClose.subscribe((res) => {
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

  onDateChange(date: Date) {
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
