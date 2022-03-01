import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';

import { MoneyMoveModalFormComponent } from './../money-move-modal-form/money-move-modal-form.component';
import {
  MoneyMoveItem,
  MoneyMoveCategory,
} from './../../interfaces/DayMoneyMove';
import { markFormControlsDirty } from '../../helpers/form.helper';

interface Item {
  category: string;
  amount: number;
  comment: string;
}

@Component({
  selector: 'app-money-move-day-card',
  templateUrl: './money-move-day-card.component.html',
  styleUrls: ['./money-move-day-card.component.scss'],
})
export class MoneyMoveDayCardComponent implements OnInit {
  @Input() items: MoneyMoveItem[];
  @Input() title: string;
  @Input() amount: number;
  @Input() currency: string;
  @Input() categories: MoneyMoveCategory[];

  @Output() onRemoveItem = new EventEmitter();
  @Output() onEditItem = new EventEmitter();

  constructor(private store: Store, private modal: NzModalService) {}

  ngOnInit(): void {}

  removeMoneyMoveItem(id: string) {
    this.onRemoveItem.emit(id);
  }

  editMoneyMoveItem(id: string, updatedItem: MoneyMoveItem) {
    this.onEditItem.emit({ itemId: id, updatedItem: updatedItem });
  }

  printModal(item: MoneyMoveItem) {
    const modal = this.modal.create({
      nzTitle: 'Title',
      nzWidth: '400px',
      nzContent: MoneyMoveModalFormComponent,
      nzComponentParams: {
        moneyMoveItem: item,
        categories: this.categories,
      },
      nzFooter: [
        {
          label: 'Remove',
          danger: true,
          type: 'primary',
          onClick: () => {
            this.removeMoneyMoveItem(item._id);
            modal.close();
          },
        },
        {
          label: 'Edit',
          type: 'primary',
          onClick: () => {
            const form = modal.getContentComponent().moneyMoveForm;
            if (form.valid) {
              this.editMoneyMoveItem(item._id, form.value);
              console.log(item);
              modal.close();
            } else {
              markFormControlsDirty(form);
            }
          },
        },
      ],
    });
  }
}
