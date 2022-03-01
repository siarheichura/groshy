import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, take, map } from 'rxjs';
import dayjs, { Dayjs } from 'dayjs';

import { DayMoneyMoveItem } from 'src/app/shared/interfaces/DayMoneyMove';
import {
  MoneyMoveItem,
  MoneyMoveCategory,
} from './../../shared/interfaces/DayMoneyMove';
import { MoneyMoveTypes } from 'src/app/shared/enums/MoneyMoveTypes';

import {
  walletCategoriesSelector,
  periodMoneyMoveSelector,
  walletCurrencySelector,
} from 'src/app/store/wallets/wallets.selectros';
import { currentTabSelector } from './../../store/shared/shared.selectros';
import {
  AddMoneyMoveItem,
  EditMoneyMoveItem,
  GetCategories,
  GetMoneyMoveByPeriod,
  RemoveMoneyMoveItem,
} from './../../store/wallets/wallets.actions';
import { ChangeTab } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit, OnDestroy {
  MoneyMoveTypes = MoneyMoveTypes;
  tabs = [MoneyMoveTypes.Expenses, MoneyMoveTypes.Income];
  startDate: Dayjs = dayjs().subtract(2, 'day');
  finishDate: Dayjs = dayjs();

  walletId: string = (this.route.snapshot.params as { id: string }).id;

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

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {}

  onTabClick(tabName: string): void {
    this.store.dispatch(ChangeTab({ payload: tabName }));
  }

  addMoneyMoveItem(formValue: MoneyMoveItem) {
    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      this.store.dispatch(
        AddMoneyMoveItem({
          payload: {
            type: tabName,
            walletId: this.walletId,
            item: formValue,
          },
        })
      );
    });
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

  editMoneyMoveItem({
    itemId: itemId,
    updatedItem: updatedItem,
  }: {
    itemId: string;
    updatedItem: MoneyMoveItem;
  }) {
    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      this.store.dispatch(
        EditMoneyMoveItem({
          payload: {
            type: tabName,
            itemId: itemId,
            updatedItem: updatedItem,
            walletId: this.walletId,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.curentTabSubs.unsubscribe();
  }
}
