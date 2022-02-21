import { TabsEnum } from 'src/app/shared/enums/TabsEnum';
import { currentTabSelector } from './../../../store/shared/shared.selectros';
import {
  RemoveExpense,
  RemoveIncome,
} from './../../../store/wallets/wallets.actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, take, skip } from 'rxjs';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Income } from './../../interfaces/Income';
import { Expense } from './../../interfaces/Expense';
import { MoneyMoveModalFormComponent } from './../money-move-modal-form/money-move-modal-form.component';
import { walletCurrencySelector } from 'src/app/store/wallets/wallets.selectros';

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

  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  currency$: Observable<string> = this.store.select(walletCurrencySelector);
  moneyMoveType$: Observable<string> = this.store
    .select(currentTabSelector)
    .pipe(take(1));

  constructor(private store: Store, private modal: NzModalService) {}

  ngOnInit(): void {}

  onDeleteCard(id: string): void {
    this.onDelete.emit(id);
  }

  onEditCard(id: string): void {
    this.onEdit.emit(id);
  }

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

  editMoneyMoveItem(item: Expense | Income) {
    // TODO
  }

  printModal(item: Expense | Income) {
    this.moneyMoveType$.subscribe((response) => {
      const modal = this.modal.create({
        nzTitle: 'Title',
        nzWidth: '400px',
        nzContent: MoneyMoveModalFormComponent,
        nzComponentParams: {
          moneyMoveItem: item,
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
              this.editMoneyMoveItem(item);
              modal.close();
            },
          },
        ],
      });
    });
  }
}
