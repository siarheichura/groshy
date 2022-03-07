import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, take, map, filter } from 'rxjs';
import dayjs, { Dayjs } from 'dayjs';

import { NzModalService } from 'ng-zorro-antd/modal';
import { markFormControlsDirty } from './../../shared/helpers/form.helper';
import { MoneyMoveFormComponent } from './money-move-form/money-move-form.component';
import {
  MoneyMoveItem,
  MoneyMoveCategory,
} from './../../shared/interfaces/DayMoneyMove';
import { MoneyMoveTypes } from 'src/app/shared/enums/MoneyMoveTypes';
import {
  categoriesSelector,
  periodMoneyMoveSelector,
  walletCurrencySelector,
} from 'src/app/store/wallets/wallets.selectros';
import { currentTabSelector } from './../../store/shared/shared.selectros';
import {
  AddMoneyMoveItem,
  EditMoneyMoveItem,
  GetWalletCategories,
  GetMoneyMoveByPeriod,
  RemoveMoneyMoveItem,
} from './../../store/wallets/wallets.actions';
import { ChangeTab } from 'src/app/store/shared/shared.actions';
import { MoneyMoveDayItem } from 'src/app/shared/classes/MoneyMoveDayItem';

interface FormValue {
  date: Date;
}

enum FormEnum {
  Date = 'date',
}

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formControls = FormEnum;

  MoneyMoveTypes = MoneyMoveTypes;
  tabs = [MoneyMoveTypes.Expense, MoneyMoveTypes.Income];
  today: Dayjs = dayjs();
  startDate: Dayjs = this.today.startOf('month');
  finishDate: Dayjs =
    this.today.endOf('month') > dayjs()
      ? dayjs().endOf('day')
      : dayjs().endOf('month');

  disabledDates = (date: Date): boolean =>
    dayjs(date).isAfter(dayjs(), 'month');

  walletId: string = (this.route.snapshot.params as { id: string }).id;

  moneyMove$: Observable<MoneyMoveDayItem[]> = this.store.select(
    periodMoneyMoveSelector
  );
  categories$: Observable<MoneyMoveCategory[]> =
    this.store.select(categoriesSelector);
  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  currentTab$: Observable<string> = this.store.select(currentTabSelector);
  curentTabSubs: Subscription = this.currentTab$.subscribe((tabName) => {
    this.store.dispatch(
      GetMoneyMoveByPeriod({
        payload: {
          walletId: this.walletId,
          type: tabName,
          startDate: this.startDate,
          finishDate: this.finishDate,
        },
      })
    );
    this.store.dispatch(
      GetWalletCategories({
        payload: { walletId: this.walletId },
      })
    );
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private modal: NzModalService,
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

  editMoneyMoveItem(item: MoneyMoveItem, updatedItem: MoneyMoveItem) {
    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      this.store.dispatch(
        EditMoneyMoveItem({
          payload: {
            type: tabName,
            itemId: item._id,
            updatedItem: updatedItem,
            walletId: this.walletId,
            startDate: this.startDate,
            finishDate: this.finishDate,
          },
        })
      );
    });
  }

  printEditMoneyMoveItemModal(item: MoneyMoveItem) {
    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      const modal = this.modal.create({
        nzTitle: 'Edit',
        nzWidth: '400px',
        nzContent: MoneyMoveFormComponent,
        nzComponentParams: {
          moneyMoveItem: item,
          categories$: this.categories$.pipe(
            map((categories) =>
              categories.filter(
                (category) => category.type.toLowerCase() === tabName
              )
            )
          ),
        },
        nzOnOk: () => {
          const form = modal.getContentComponent().moneyMoveForm;
          if (form.valid) {
            this.editMoneyMoveItem(item, form.value);
          } else {
            markFormControlsDirty(form);
            return false;
          }
          return true;
        },
      });
    });
  }

  printAddMoneyMoveItemModal() {
    this.currentTab$.pipe(take(1)).subscribe((tabName) => {
      const modal = this.modal.create({
        nzTitle: 'Add',
        nzWidth: '400px',
        nzContent: MoneyMoveFormComponent,
        nzComponentParams: {
          categories$: this.categories$.pipe(
            map((categories) =>
              categories.filter(
                (category) => category.type.toLowerCase() === tabName
              )
            )
          ),
        },
        nzOnOk: () => {
          const form = modal.getContentComponent().moneyMoveForm;
          if (form.valid) {
            this.addMoneyMoveItem(form.value);
          } else {
            markFormControlsDirty(form);
            return false;
          }
          return true;
        },
      });
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
            type: tabName,
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
