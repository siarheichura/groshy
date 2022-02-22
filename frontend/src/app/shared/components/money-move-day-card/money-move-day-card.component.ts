import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { currentTabSelector } from './../../../store/shared/shared.selectros';
import {
  EditExpense,
  EditIncome,
  RemoveExpense,
  RemoveIncome,
} from './../../../store/wallets/wallets.actions';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, take, skip } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Income } from './../../interfaces/Income';
import { Expense } from './../../interfaces/Expense';
import { MoneyMoveModalFormComponent } from './../money-move-modal-form/money-move-modal-form.component';
import {
  walletCurrencySelector,
  walletExpenseCategoriesSelector,
  walletIncomeCategoriesSelector,
  walletSelector,
} from 'src/app/store/wallets/wallets.selectros';
import { markFormControlsDirty } from '../../helpers/form.helper';

@Component({
  selector: 'app-money-move-day-card',
  templateUrl: './money-move-day-card.component.html',
  styleUrls: ['./money-move-day-card.component.scss'],
})
export class MoneyMoveDayCardComponent implements OnInit {
  @Input() items: Expense[] | Income[];
  @Input() amount: number | null;
  @Input() walletCurrency: string | null;
  @Input() title: string;

  expenseCategories$: Observable<string[]> = this.store.select(
    walletExpenseCategoriesSelector
  );
  incomeCategories$: Observable<string[]> = this.store.select(
    walletIncomeCategoriesSelector
  );
  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  moneyMoveType$: Observable<string> = this.store
    .select(currentTabSelector)
    .pipe(take(1));

  constructor(private store: Store, private modal: NzModalService) {}

  ngOnInit(): void {}

  removeMoneyMoveItem(item: Expense | Income) {
    this.moneyMoveType$.subscribe((response) => {
      response === TabsEnum.Expenses
        ? this.store.dispatch(
            RemoveExpense({ payload: { expenseId: item._id } })
          )
        : this.store.dispatch(
            RemoveIncome({ payload: { incomeId: item._id } })
          );
    });
  }

  editMoneyMoveItem(item: Expense | Income, updatedItem: Expense | Income) {
    this.moneyMoveType$.subscribe((response) => {
      response === TabsEnum.Expenses
        ? this.store.dispatch(
            EditExpense({
              payload: { expense: item, updatedExpense: updatedItem },
            })
          )
        : this.store.dispatch(
            EditIncome({
              payload: { income: item, updatedIncome: updatedItem },
            })
          );
    });
  }

  printModal(item: Expense | Income) {
    this.moneyMoveType$.subscribe((response) => {
      const modal = this.modal.create({
        nzTitle: 'Title',
        nzWidth: '400px',
        nzContent: MoneyMoveModalFormComponent,
        nzComponentParams: {
          moneyMoveItem: item,
          categories$:
            response === TabsEnum.Expenses
              ? this.expenseCategories$
              : this.incomeCategories$,
        },
        nzFooter: [
          {
            label: 'Remove',
            danger: true,
            type: 'primary',
            onClick: () => {
              this.removeMoneyMoveItem(item);
              modal.close();
            },
          },
          {
            label: 'Edit',
            type: 'primary',
            onClick: () => {
              const form = modal.getContentComponent().moneyMoveForm;
              if (form.valid) {
                this.editMoneyMoveItem(item, form.value);
                modal.close();
              } else {
                markFormControlsDirty(form);
              }
            },
          },
        ],
      });
    });
  }
}
