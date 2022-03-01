import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import dayjs, { Dayjs } from 'dayjs';
import { Observable, Subscription, take } from 'rxjs';

import { MoneyMoveItem } from './../../shared/interfaces/DayMoneyMove';
import {
  GetMoneyMoveByPeriod,
  GetCategories,
  RemoveMoneyMoveItem,
  EditMoneyMoveItem,
} from './../../store/wallets/wallets.actions';
import { ChangeTab } from './../../store/shared/shared.actions';
import {
  periodMoneyMoveSelector,
  walletCategoriesSelector,
  walletCurrencySelector,
} from './../../store/wallets/wallets.selectros';
import { currentTabSelector } from 'src/app/store/shared/shared.selectros';
import {
  DayMoneyMoveItem,
  MoneyMoveCategory,
} from 'src/app/shared/interfaces/DayMoneyMove';
import { MoneyMoveTypes } from './../../shared/enums/MoneyMoveTypes';

interface FormValue {
  date: Date;
}

enum FormEnum {
  Date = 'date',
}

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  today = dayjs();
  form: FormGroup;
  formControls = FormEnum;
  MoneyMoveTypes = MoneyMoveTypes;
  tabs = [MoneyMoveTypes.Expenses, MoneyMoveTypes.Income];
  walletId: string = (this.route.parent?.snapshot.params as { id: string }).id;
  disabledDates = (date: Date): boolean =>
    dayjs(date).isAfter(dayjs(), 'month');

  startDate: Dayjs = dayjs().startOf('month');
  finishDate: Dayjs =
    dayjs().endOf('month') > dayjs()
      ? dayjs().endOf('day')
      : dayjs().endOf('month');

  moneyMove$: Observable<DayMoneyMoveItem[]> = this.store.select(
    periodMoneyMoveSelector
  );
  categories$: Observable<MoneyMoveCategory[]> = this.store.select(
    walletCategoriesSelector
  );
  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  currentTab$: Observable<string> = this.store.select(currentTabSelector);
  curentTabSubs: Subscription = this.currentTab$.subscribe((tabName) => {
    this.store.dispatch(
      GetMoneyMoveByPeriod({
        payload: {
          walletId: this.walletId,
          type: tabName.toLowerCase(),
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );
    this.store.dispatch(
      GetCategories({
        payload: { walletId: this.walletId, type: tabName.toLowerCase() },
      })
    );
  });

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      [FormEnum.Date]: [''],
    });
  }

  onTabClick(tabName: string): void {
    this.store.dispatch(ChangeTab({ payload: tabName }));
  }

  removeMoneyMoveItem(id: string) {
    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      this.store.dispatch(
        RemoveMoneyMoveItem({
          payload: {
            type: tabName,
            itemId: id,
            walletId: this.walletId,
          },
        })
      );
    });
  }

  editMoneyMoveItem(
    {
      itemId: itemId,
      updatedItem: updatedItem,
    }: {
      itemId: string;
      updatedItem: MoneyMoveItem;
    },
    date: Date
  ) {
    const startDate = dayjs(date).startOf('month');
    const finishDate: Dayjs =
      dayjs(date).endOf('month') > dayjs()
        ? dayjs(date).endOf('day')
        : dayjs(date).endOf('month');

    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      this.store.dispatch(
        EditMoneyMoveItem({
          payload: {
            type: tabName,
            itemId: itemId,
            updatedItem: updatedItem,
            walletId: this.walletId,
            startDate: startDate,
            finishDate: finishDate,
          },
        })
      );
    });
  }

  onDateChange(date: Date) {
    const startDate = dayjs(date).startOf('month');
    const finishDate: Dayjs =
      dayjs(date).endOf('month') > dayjs()
        ? dayjs(date).endOf('day')
        : dayjs(date).endOf('month');

    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      this.store.dispatch(
        GetMoneyMoveByPeriod({
          payload: {
            walletId: this.walletId,
            type: tabName.toLowerCase(),
            startDate: startDate,
            finishDate: finishDate,
          },
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.curentTabSubs.unsubscribe();
  }
}
